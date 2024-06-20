class DocumentChannel < ApplicationCable::Channel
  def subscribed
    stream_from "document_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast("document_channel", data)
  end
end
