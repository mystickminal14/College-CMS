import React from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Redo,
  Underline,
  Undo,
  Unlink,
} from "lucide-react";
import { clubRichTextClass, toClubHtml } from "../../../utils/clubRichText";

interface Props {
  label: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const ToolButton: React.FC<{
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ title, active, disabled, onClick, children }) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    aria-pressed={active}
    disabled={disabled}
    onClick={onClick}
    className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
      active
        ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
  >
    {children}
  </button>
);

// Enter starts a new paragraph, Shift+Enter a line break. The forms mount this
// fresh each time, so `value` is only read as the starting content.
const ClubTextEditor: React.FC<Props> = ({ label, value, onChange, placeholder = "", disabled = false }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
        strike: false,
        link: { openOnClick: false },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: toClubHtml(value),
    editable: !disabled,
    // An empty editor still serialises to <p></p>; the website checks for "".
    onUpdate: ({ editor }) => onChange(editor.getText().trim() ? editor.getHTML() : ""),
    editorProps: {
      attributes: { class: `club-text-editor ${clubRichTextClass} outline-none min-h-28 px-4 py-3 text-sm leading-relaxed` },
    },
  });

  const s = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      underline: editor.isActive("underline"),
      bullets: editor.isActive("bulletList"),
      numbers: editor.isActive("orderedList"),
      link: editor.isActive("link"),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  const addLink = () => {
    const url = window.prompt("Enter URL", editor.getAttributes("link").href ?? "")?.trim();
    if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <style>{`
        .club-text-editor p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
          color: #9ca3af;
        }
      `}</style>
      <div className={`rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 overflow-hidden ${disabled ? "opacity-50" : ""}`}>
        <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
          <ToolButton title="Bold" active={s.bold} onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold size={15} />
          </ToolButton>
          <ToolButton title="Italic" active={s.italic} onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic size={15} />
          </ToolButton>
          <ToolButton title="Underline" active={s.underline} onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <Underline size={15} />
          </ToolButton>
          <ToolButton title="Bullet list" active={s.bullets} onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <List size={15} />
          </ToolButton>
          <ToolButton title="Numbered list" active={s.numbers} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered size={15} />
          </ToolButton>
          <ToolButton title="Add link" active={s.link} onClick={addLink}>
            <LinkIcon size={15} />
          </ToolButton>
          <ToolButton title="Remove link" disabled={!s.link} onClick={() => editor.chain().focus().unsetLink().run()}>
            <Unlink size={15} />
          </ToolButton>
          <ToolButton title="Undo" disabled={!s.canUndo} onClick={() => editor.chain().focus().undo().run()}>
            <Undo size={15} />
          </ToolButton>
          <ToolButton title="Redo" disabled={!s.canRedo} onClick={() => editor.chain().focus().redo().run()}>
            <Redo size={15} />
          </ToolButton>
        </div>
        <div className="text-gray-900 dark:text-white">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default ClubTextEditor;
