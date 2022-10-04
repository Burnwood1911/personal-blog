import { Editor } from "@tiptap/react";

interface MenuProps {
  editor: Editor;
  setLink: () => void;
  addImage: () => void;
}

const Menubar = ({ editor, setLink, addImage }: MenuProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="ProseMirror">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        code
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="m-1 rounded-sm border border-solid border-black p-1"
      >
        clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="m-1 rounded-sm border border-solid border-black p-1"
      >
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph")
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        h3
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock")
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        blockquote
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="m-1 rounded-sm border border-solid border-black p-1"
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="m-1 rounded-sm border border-solid border-black p-1"
      >
        redo
      </button>

      <button
        onClick={setLink}
        className={
          editor?.isActive("link")
            ? "is-active m-1 rounded-sm border border-solid border-black bg-black p-1 text-white"
            : "m-1 rounded-sm border border-solid border-black p-1"
        }
      >
        setLink
      </button>
      <button
        onClick={() => editor?.chain().focus().unsetLink().run()}
        disabled={!editor?.isActive("link")}
        className="m-1 rounded-sm border border-solid border-black p-1"
      >
        unsetLink
      </button>

      <button
        onClick={addImage}
        className="m-1 rounded-sm border border-solid border-black p-1"
      >
        setImage
      </button>
    </div>
  );
};

export default Menubar;
