import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import BlogToolbar from "./BlogToolbar";
import { useEffect, useRef } from "react";

interface BlogEditorProps {
  onChange: (html: string) => void;
  initialContent?: string;
}

const BlogEditor = ({ onChange, initialContent = "" }: BlogEditorProps) => {
  // FIX 1: Track whether we've seeded the editor once — never re-seed after that.
  // Previously used seededContentRef which compared content strings, but since
  // onChange → parent state → initialContent prop creates a loop, any typing
  // would change initialContent and trigger a re-seed, resetting cursor to end.
  const seededRef = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
        
        link: false,
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "blog-editor-content outline-none min-h-[320px] p-4",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (!initialContent) return;

    // FIX: Once seeded, never touch the editor content again.
    // Without this guard, every keystroke triggers onChange → parent updates
    // content state → initialContent prop changes → this effect fires again
    // → setContent resets the editor and snaps cursor to "end".
    if (seededRef.current) return;

    const timeout = setTimeout(() => {
      editor.commands.setContent(initialContent, { emitUpdate: false });
      editor.commands.focus("end");
      seededRef.current = true;
    }, 0);

    return () => clearTimeout(timeout);
  }, [editor, initialContent]);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
      {editor && <BlogToolbar editor={editor} />}

      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <style>{`
          .blog-editor-content h1 { font-size: 2rem; font-weight: 700; margin: 1rem 0 0.5rem; line-height: 1.2; }
          .blog-editor-content h2 { font-size: 1.5rem; font-weight: 700; margin: 1rem 0 0.5rem; }
          .blog-editor-content h3 { font-size: 1.25rem; font-weight: 600; margin: 0.75rem 0 0.4rem; }
          .blog-editor-content h4 { font-size: 1.1rem; font-weight: 600; margin: 0.75rem 0 0.4rem; }
          .blog-editor-content h5 { font-size: 1rem; font-weight: 600; margin: 0.5rem 0 0.3rem; }
          .blog-editor-content h6 { font-size: 0.9rem; font-weight: 600; margin: 0.5rem 0 0.3rem; color: #6b7280; }

          .blog-editor-content p { margin: 0.5rem 0; line-height: 1.7; }

          .blog-editor-content ul { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
          .blog-editor-content ol { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }

          .blog-editor-content li { margin: 0.25rem 0; }

          .blog-editor-content blockquote {
            border-left: 3px solid #374151;
            padding-left: 1rem;
            color: #6b7280;
            margin: 1rem 0;
            font-style: italic;
          }

          .blog-editor-content strong { font-weight: 700; color: #111827; }
          .blog-editor-content em { font-style: italic; }
          .blog-editor-content s { text-decoration: line-through; color: #9ca3af; }

          .blog-editor-content a { color: #111827; text-decoration: underline; }

          .blog-editor-content img {
            max-width: 100%;
            border-radius: 0.5rem;
            margin: 1rem 0;
          }

          .blog-editor-content hr {
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 1.5rem 0;
          }

          .blog-editor-content table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
          }

          .blog-editor-content th {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            padding: 0.5rem 0.75rem;
            text-align: left;
            font-weight: 600;
            color: #111827;
            font-size: 0.875rem;
          }

          .blog-editor-content td {
            border: 1px solid #e5e7eb;
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
            color: #374151;
          }

          .blog-editor-content tr:nth-child(even) td {
            background: #f3f4f6;
          }

          .blog-editor-content .selectedCell {
            background: #dbeafe !important;
          }

          /* Dark mode */
          .dark .blog-editor-content h6 { color: #9ca3af; }
          .dark .blog-editor-content blockquote { border-left-color: #4b5563; color: #9ca3af; }
          .dark .blog-editor-content strong { color: #f9fafb; }
          .dark .blog-editor-content s { color: #6b7280; }
          .dark .blog-editor-content a { color: #e5e7eb; }
          .dark .blog-editor-content hr { border-top-color: #374151; }
          .dark .blog-editor-content th { background: #1f2937; border-color: #374151; color: #f9fafb; }
          .dark .blog-editor-content td { border-color: #374151; color: #d1d5db; }
          .dark .blog-editor-content tr:nth-child(even) td { background: #111827; }
          .dark .blog-editor-content .selectedCell { background: #1e3a5f !important; }
        `}</style>

        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default BlogEditor;