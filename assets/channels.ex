defmodule ElixirConurrency.Queue do
  def new(max_size) do
    { :queue.new, 0, max_size}
  end

  def new(:unbuffered) do
    { :queue.new, 0, :unbuffered}
  end

  def in(bounded_queue, item) do
    case bounded_queue do
      { queue, len, :unbuffered } ->
      {{:ok,  :queue.in(item, queue)},
        len + 1, max}
      }
      { que, len, max_size } ->
        if len == max_size do
          {:buffered, queue}
        else
          {:ok, { :queue.in(item, queue),
            len + 1, max}
          }
  end

  def take(bounded_queue) do
    {queue, len, max, buffer} = bounded_queue
    if len == 0 do
      {:empty, queue}
    else
      {{ :value, item }, new_queue } =
      :queue.out(queue)
      {{ :value, item },
        { new_queue, len - 1, max}
        }
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

  def handle_call({:out, queue}, from, state) do
   case Queue.take(queue) do
    {:empty, _ } ->
      {:noreply, state}
    {{:value, {item, new_queue, size, buffer_type}} ->
      {:reply, {item, new_queue}, { new_queue }}
    end
  end

  def handle_call(:in, {queue, value}) do
    case Queue.in(queue, value) do
      {:buffered, queue } ->
        {:noreply, queue}

      {{:ok, queue}, len, max_length} ->
        {:reply, queue, queue}
    end
  end
end
