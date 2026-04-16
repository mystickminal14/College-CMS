import { Editor, useEditorState } from '@tiptap/react'
import {
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code2, Undo, Redo,
} from "lucide-react"

const Btn = ({ onClick, active, disabled, children, tooltip }: any) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={tooltip}
    className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 border
      ${active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"}
      hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed`}
  >
    {children}
  </button>
)

const ToolBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      canBold: ctx.editor.can().chain().toggleBold().run(),
      isItalic: ctx.editor.isActive("italic"),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),
      isStrike: ctx.editor.isActive("strike"),
      canStrike: ctx.editor.can().chain().toggleStrike().run(),
      isCode: ctx.editor.isActive("code"),
      canCode: ctx.editor.can().chain().toggleCode().run(),
      isH1: ctx.editor.isActive("heading", { level: 1 }),
      isH2: ctx.editor.isActive("heading", { level: 2 }),
      isH3: ctx.editor.isActive("heading", { level: 3 }),
      isBullet: ctx.editor.isActive("bulletList"),
      isOrdered: ctx.editor.isActive("orderedList"),
      isQuote: ctx.editor.isActive("blockquote"),
      isCodeBlock: ctx.editor.isActive("codeBlock"),
      canUndo: ctx.editor.can().chain().undo().run(),
      canRedo: ctx.editor.can().chain().redo().run(),
    }),
  })

  return (
    <div className="flex flex-wrap items-center gap-2 border-b pb-2">
      <div className="flex gap-1">
        <Btn tooltip="Bold" active={editorState.isBold} disabled={!editorState.canBold}
          onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></Btn>
        <Btn tooltip="Italic" active={editorState.isItalic} disabled={!editorState.canItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></Btn>
        <Btn tooltip="Strike" active={editorState.isStrike} disabled={!editorState.canStrike}
          onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={16} /></Btn>
        <Btn tooltip="Code" active={editorState.isCode} disabled={!editorState.canCode}
          onClick={() => editor.chain().focus().toggleCode().run()}><Code size={16} /></Btn>
      </div>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <div className="flex gap-1">
        <Btn tooltip="H1" active={editorState.isH1}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={16} /></Btn>
        <Btn tooltip="H2" active={editorState.isH2}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></Btn>
        <Btn tooltip="H3" active={editorState.isH3}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={16} /></Btn>
      </div>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <div className="flex gap-1">
        <Btn tooltip="Bullet List" active={editorState.isBullet}
          onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></Btn>
        <Btn tooltip="Ordered List" active={editorState.isOrdered}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></Btn>
      </div>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <div className="flex gap-1">
        <Btn tooltip="Quote" active={editorState.isQuote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></Btn>
        <Btn tooltip="Code Block" active={editorState.isCodeBlock}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code2 size={16} /></Btn>
      </div>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <div className="flex gap-1 ml-auto">
        <Btn tooltip="Undo" disabled={!editorState.canUndo}
          onClick={() => editor.chain().focus().undo().run()}><Undo size={16} /></Btn>
        <Btn tooltip="Redo" disabled={!editorState.canRedo}
          onClick={() => editor.chain().focus().redo().run()}><Redo size={16} /></Btn>
      </div>
    </div>
  )
}

export { ToolBar }
export default ToolBar