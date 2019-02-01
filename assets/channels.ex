defmodule ElixirConurrency.Queue do
def new(max_size) do
    { :queue.new, 0, max_size }
  end

  def new(:unbuffered) do
    { :queue.new, 0, :unbuffered }
  end

  def put(bounded_queue, item ) do
    case bounded_queue do
      { queue, len, :unbuffered } ->
        queue = :queue.in(item, queue)
        {{:ok, queue }, len + 1}
      { queue, len, max_size } ->
        if len == max_size do
          {:buffered, queue}
        else
          {{:ok, :queue.in(item, queue)}, len + 1, max_size }
        end
    end
  end

  def take(bounded_queue) do
    {queue, len, buffer} = bounded_queue
    case bounded_queue do
      {{[], []}, _, _ } ->
        {:empty, queue }
      { queue, len, buffer } ->
        {{ :value, item }, new_queue } =
        :queue.out(queue)
        {{ :value, item },{ new_queue, len - 1, buffer}}
    end
  end
end

defmodule ElixirConcurrency.Server do
 use GenServer
  alias ElixirConcurrency.Queue

  @max_queue_size 1024

  def new(buffer) do
    Queue.new(@max_queue_size)
  end

  def init([]) do
    {:ok, new(:unbuffered)}
  end

  def init([buffer_size]) do
    if buffer_size <= 0 do
      {:ok, new(:unbuffered)}
    else
      {:ok, new(Queue.new(buffer_size))}
    end
  end

  def handle_call(:out, from, {queue, len, max}) do
   case Queue.take({queue, len, max}) do
    {:empty, _} ->
      {:noreply, { queue, 0, max }}
    {{:value, item}, {new_queue, size, buffer_type}} ->
      GenServer.reply(from, {queue, item})
      {:reply, {item, new_queue}, { new_queue, len, max }}
    end
  end

  def handle_call({:put, item}, from, {queue, len, max}) do
    case Queue.put({queue, len, max}, item) do
      {:buffered, queue } ->
        {:noreply, { queue, len, max }}

      {{:ok, queue}, len, max} ->
        GenServer.reply(from, queue);
        {:reply, queue, {queue, len, max}}
    end
  end
end
