import { Editor } from '@tiptap/react'
import { Level } from '@tiptap/extension-heading'
import { customCallOut } from '@/components/tiptap/callout/callout';

export class TiptapEditorUtils {
  editor: Editor

  constructor(editor: Editor) {
    this.editor = editor;
  }

  clearCurrentLineContent() {
    const { tr, doc } = this.editor.state;
    const { from, to } = this.editor.view.state.selection;

    const $from = doc.resolve(from);
    const $to = doc.resolve(to);

    // Get the start and end positions of the current line
    const startOfLine = $from.start();
    const endOfLine = $to.end();

    // Iterate through the nodes in the current line
    doc.nodesBetween(startOfLine, endOfLine, (node: any, pos: any) => {
      // Check if the node is a text node
      if (node.isText) {
        // If it's a text node, delete its content
        tr.delete(pos, pos + node.nodeSize);
      }
      // additional conditions here to handle non-text nodes (e.g., images)
    });

    // Apply the transaction to the editor
    this.editor.view.dispatch(tr);
  };

  toggleHeading(level: Level) {
    this.editor.chain().focus().toggleHeading({ level: level }).run()
  }

  setParagraph() {
    this.editor.chain().focus().setParagraph().run()
  }

  toggleBulletList() {
    this.editor.chain().focus().toggleBulletList().run()
  }

  toggleNumberedList() {
    this.editor.chain().focus().toggleOrderedList().run()
  }

  toggleBold() {
    this.editor.chain().focus().toggleBold().run()
  }

  toggleItalic() {
    this.editor.chain().focus().toggleItalic().run()
  }

  toggleUnderline() {
    this.editor.chain().focus().toggleUnderline().run()
  }

  toggleStrike() {
    this.editor.chain().focus().toggleStrike().run()
  }

  setImage(imgUrl: string) {
    this.editor.chain().focus().setImage({ src: imgUrl }).run()
  }

  insertTable({ rows, cols }: { rows: number; cols: number }) {
    this.editor.chain().focus().insertTable({ rows: rows, cols: cols, withHeaderRow: true }).run()
  }

  insertCallout() {
    this.editor.chain().focus().insertContent("<h1 style='font-size:100px'>hello world</h1>", {
      parseOptions: {
        preserveWhitespace: false
      }
    }).run()
  }
}
