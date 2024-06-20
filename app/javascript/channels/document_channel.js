import consumer from "./consumer"

consumer.subscriptions.create("DocumentChannel", {
  connected() {
    console.log("Connected to DocumentChannel")
  },

  disconnected() {
    console.log("Disconnected from DocumentChannel")
  },

  received(data) {
    const editor = window.editor;
    if (editor && editor.getHTML() !== data.content) {
      editor.commands.setContent(data.content, false);
    }
  },

  sendContent(content) {
    this.perform('receive', { content: content });
  }
});
