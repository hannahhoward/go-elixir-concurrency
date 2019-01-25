defmodule Server do
  use GenServer

  alias Gossip.Peer
  alias Gossip.BlockChain
  alias Gossip.Transaction

  def start_link(_) do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  end

  def init(_) do
    schedule_send_message()
    {:ok, %{ me: %{id: self(), block_chain: []}, uuids: []}}
  end

  def send_message() do
    GenServer.cast( __MODULE__ , {:mine_and_gossip})
  end

  def retrieve_state() do
    GenServer.call( __MODULE__, {:retrieve_state} )
  end

  def handle_call({:retrieve_state}, from, my_state) do
    {:reply, my_state, my_state}
  end

  def handle_info(:schedule_send_message, state) do
    send_message()
    schedule_send_message()
    {:noreply, state}
  end

  def handle_cast({:mine_and_gossip}, my_state = %{me: me}) do
    block_chain = case BlockChain.add_genesis_block? do
        true ->
          BlockChain.add_block
        false ->
          block_chain_state = BlockChain.get_state
          transaction = Transaction.new_transaction('', block_chain_state.pub_key, :rand.uniform(100), block_chain_state.priv_key)
          BlockChain.add_block(transaction)
    end

    new_block_chain = me
    |> Map.put(:block_chain, block_chain.blocks)
    |> Map.put(:uuid, UUID.uuid4())


    send_block_chain(new_block_chain, Node.list)
    my_state = %{my_state | me: new_block_chain }
    IO.inspect my_state
    {:noreply, my_state}
  end



  def handle_cast({:message_from_peer, block_chain_message = %{block_chain: blocks,  id: id, uuid: uuid }}, my_state = %{ me: me,  uuids: uuids}) do
    if me.id == id do
      {:noreply, my_state}
    else
      if !Enum.member?(my_state.uuids, block_chain_message.uuid) do
        case length(blocks) > 1 && length(blocks) > length(me.block_chain) && BlockChain.validate_blocks(blocks) do
          {:ok, true} ->
            uuids = update_uuids(block_chain_message.uuid, my_state.uuids)
            updated_blocks = BlockChain.swap_chain(blocks)
            me = %{me | block_chain: blocks}
            my_state = %{my_state | me: me, uuids: uuids}

            send_block_chain(me, Node.list)
            IO.inspect my_state
            {:noreply, my_state}

          {:error, false} ->
            IO.inspect my_state
            {:noreply, my_state}
          false ->
            {:noreply, my_state}

        end
      else
        IO.inspect my_state
        {:noreply, my_state}
      end
    end
  end

  def send_block_chain(new_block_chain, peers) do
    IO.puts "send message"
    IO.inspect new_block_chain

    Enum.map(peers, fn (peer) ->
      IO.puts "peer"
      IO.inspect peer

      Node.connect(peer)
      GenServer.cast({__MODULE__, peer}, {:message_from_peer, new_block_chain})
     end)
  end

  def update_uuids(peer_uuid, uuids) do
    uuids = case Enum.member?(uuids, peer_uuid) do
      false ->
        [peer_uuid | uuids]
      _ -> uuids
    end
  end


  def schedule_send_message do
    Process.send_after(self(), :schedule_send_message, 30000) # In 2 hours
  end

end


defmodule Gossip.Application do
  use Application
  use Supervisor

  def start(_type, _args) do
    Supervisor.start_link([{Gossip.Server, []}, {Gossip.BlockChain, []}], strategy: :one_for_one, name: Gossip.Supervisor)
  end
end
