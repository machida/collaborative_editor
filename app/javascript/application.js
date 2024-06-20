import { createConsumer } from "@rails/actioncable"
import { Editor } from "tiptap"
import StarterKit from "tiptap-starter-kit"

const consumer = createConsumer()

document.addEventListener("DOMContentLoaded", () => {
  const editorElement = document.querySelector('#editor')
  if (editorElement) {
    const editor = new Editor({
      element: editorElement,
      extensions: [StarterKit],
      content: '',
      onUpdate: ({ editor }) => {
        const content = editor.getHTML()
        const documentChannel = consumer.subscriptions.create("DocumentChannel", {
          received(data) {
            if (editor.getHTML() !== data.content) {
              editor.commands.setContent(data.content, false)
            }
          }
        })
        documentChannel.send({ content: content })
      }
    })

    window.editor = editor
  }
})


document.addEventListener("DOMContentLoaded", () => {
  const editorElement = document.querySelector('#editor');

  // div要素が存在するか確認し、存在すれば処理を実行
  function checkAndInsertText() {
    const divElement = editorElement.querySelector('div');
    if (divElement) {
      if (divElement.textContent.trim() === '') {
        divElement.textContent = 'aaa';
      }
      return true; // divElementが存在するので処理を終了
    }
    return false; // divElementが存在しないので処理を続行
    console.log('aaaa');
  }

  // 初回チェック
  if (checkAndInsertText()) return;

  // MutationObserverで監視
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if (checkAndInsertText()) {
          observer.disconnect(); // 処理が完了したら監視を停止
          break;
        }
      }
    }
  });

  // #editor内の変更を監視
  observer.observe(editorElement, { childList: true, subtree: true });
});
