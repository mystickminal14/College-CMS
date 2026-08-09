import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import HardBreak from "@tiptap/extension-hard-break";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import { Placeholder, UndoRedo } from "@tiptap/extensions";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  Link as LinkIcon,
  Unlink,
  Undo,
  Redo,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { toCitationHtml } from "../citationHtml";

interface CitationEditorProps {
  label: string;
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  isSubmitting?: boolean;
}

const Btn = ({
  onClick,
  active,
  disabled,
  children,
  tooltip,
}: {
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  tooltip?: string;
}) => (
  <button
    type="button"
    title={tooltip}
    disabled={disabled}
    onClick={onClick}
    className={`
      flex items-center justify-center w-8 h-8 rounded-md text-xs font-semibold
      transition-all duration-200 cursor-pointer
      ${
        active
          ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shadow-sm"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      }
      disabled:opacity-30 disabled:cursor-not-allowed
    `}
  >
    {children}
  </button>
);

const Divider = () => (
  <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-0.5" />
);

const CitationEditor = ({
  label,
  field,
  value,
  onChange,
  icon,
  placeholder = "",
  required = false,
  isSubmitting = false,
}: CitationEditorProps) => {
  // Seed the editor from `value` exactly once. Typing calls onChange, which
  // updates the parent's formData, which flows back in as a new `value` — so
  // re-seeding on every change would reset the cursor to the end on each
  // keystroke. Same guard as BlogEditor.
  //
  // "Once" can't simply mean "on mount": the wizard mounts this form and only
  // then runs its prefill effect, so an edit's existing citation arrives a tick
  // after mount. So the guard closes on whichever comes first — the first
  // non-empty `value`, or the user's first keystroke (see onUpdate).
  const seededRef = useRef(false);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      HardBreak,
      Bold,
      Italic,
      Underline,
      Superscript,
      Subscript,
      Link.configure({ openOnClick: false, autolink: false }),
      UndoRedo,
      Placeholder.configure({ placeholder }),
    ],
    content: "",
    editable: !isSubmitting,
    onUpdate: ({ editor }) => {
      // Only user edits reach here — seeding uses emitUpdate: false — so this
      // is the point past which the seeding effect must never fire again.
      seededRef.current = true;

      // An "empty" Tiptap doc still serialises to <p></p>. Hand the parent a
      // real empty string so the public page's `howToCite?.trim()` check keeps
      // hiding the citation block.
      const isEmpty = editor.getText().trim() === "";
      onChange(field, isEmpty ? "" : editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "citation-editor-content outline-none min-h-24 px-4 py-3",
      },
    },
  });

  const s = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: !!ctx.editor?.isActive("bold"),
      isItalic: !!ctx.editor?.isActive("italic"),
      isUnderline: !!ctx.editor?.isActive("underline"),
      isSuperscript: !!ctx.editor?.isActive("superscript"),
      isSubscript: !!ctx.editor?.isActive("subscript"),
      isLink: !!ctx.editor?.isActive("link"),
      canUndo: !!ctx.editor?.can().undo(),
      canRedo: !!ctx.editor?.can().redo(),
    }),
  });

  useEffect(() => {
    if (!editor) return;
    if (seededRef.current) return;
    if (!value) return;

    editor.commands.setContent(toCitationHtml(value), { emitUpdate: false });
    seededRef.current = true;
  }, [editor, value]);

  useEffect(() => {
    editor?.setEditable(!isSubmitting);
  }, [editor, isSubmitting]);

  const addLink = () => {
    const previous = editor?.getAttributes("link").href ?? "";
    const url = window.prompt("Enter URL", previous);
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {icon && <span className="text-[#135EAB]">{icon}</span>}
        <span>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </span>
      </label>

      <div
        className={`rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 overflow-hidden transition-colors duration-300 ${
          isSubmitting ? "opacity-50" : ""
        }`}
      >
        {editor && s && (
          <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
            <Btn
              tooltip="Bold"
              active={s.isBold}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <BoldIcon size={15} />
            </Btn>
            <Btn
              tooltip="Italic (journal & book titles)"
              active={s.isItalic}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <ItalicIcon size={15} />
            </Btn>
            <Btn
              tooltip="Underline"
              active={s.isUnderline}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon size={15} />
            </Btn>

            <Divider />

            <Btn
              tooltip="Superscript"
              active={s.isSuperscript}
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
            >
              <SuperscriptIcon size={15} />
            </Btn>
            <Btn
              tooltip="Subscript"
              active={s.isSubscript}
              onClick={() => editor.chain().focus().toggleSubscript().run()}
            >
              <SubscriptIcon size={15} />
            </Btn>

            <Divider />

            <Btn tooltip="Add link" active={s.isLink} onClick={addLink}>
              <LinkIcon size={15} />
            </Btn>
            <Btn
              tooltip="Remove link"
              disabled={!s.isLink}
              onClick={() => editor.chain().focus().unsetLink().run()}
            >
              <Unlink size={15} />
            </Btn>

            <Divider />

            <Btn
              tooltip="Undo"
              disabled={!s.canUndo}
              onClick={() => editor.chain().focus().undo().run()}
            >
              <Undo size={15} />
            </Btn>
            <Btn
              tooltip="Redo"
              disabled={!s.canRedo}
              onClick={() => editor.chain().focus().redo().run()}
            >
              <Redo size={15} />
            </Btn>
          </div>
        )}

        <style>{`
          .citation-editor-content p { margin: 0; line-height: 1.7; }
          .citation-editor-content p + p { margin-top: 0.5rem; }
          .citation-editor-content em { font-style: italic; }
          .citation-editor-content strong { font-weight: 700; }
          .citation-editor-content sup { vertical-align: super; font-size: 0.75em; }
          .citation-editor-content sub { vertical-align: sub; font-size: 0.75em; }
          .citation-editor-content a { color: #135EAB; text-decoration: underline; }
          .citation-editor-content p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
            color: #9ca3af;
          }
        `}</style>

        <div className="text-gray-900 dark:text-white">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default CitationEditor;
