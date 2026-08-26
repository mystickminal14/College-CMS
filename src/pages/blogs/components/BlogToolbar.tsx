import { Editor, useEditorState } from "@tiptap/react";
import {
  Bold, Italic, Strikethrough, List, ListOrdered,
  Quote, Undo, Redo, Table, Link, Image, ExternalLink,
  AlignLeft, AlignCenter, AlignRight, Minus,
} from "lucide-react";
import { useRef, useContext, useState } from "react";
import { AppContext } from "../../../context/ContextApp";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";
import APIClient from "../../../services/apiClient";
import { IMAGE_URL } from "../../../constants";

const Divider = () => <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-0.5" />;

const Btn = ({
  onClick, active, disabled, children, tooltip,
}: {
  onClick?: () => void; active?: boolean; disabled?: boolean;
  children: React.ReactNode; tooltip?: string;
}) => (
  <button
    type="button"
    title={tooltip}
    disabled={disabled}
    onClick={onClick}
    className={`
      relative flex items-center justify-center w-8 h-8 rounded-md text-xs font-semibold
      transition-all duration-200 cursor-pointer
      ${active
        ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shadow-sm"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      }
      disabled:opacity-30 disabled:cursor-not-allowed
    `}
  >
    {children}
  </button>
);

const BlogToolbar = ({ editor }: { editor: Editor }) => {
  const appContext = useContext(AppContext);
  const showToast = appContext?.showToast;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const s = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isStrike: ctx.editor.isActive("strike"),
      isBullet: ctx.editor.isActive("bulletList"),
      isOrdered: ctx.editor.isActive("orderedList"),
      isQuote: ctx.editor.isActive("blockquote"),
      isLink: ctx.editor.isActive("link"),
      textAlign: ctx.editor.isActive({ textAlign: "left" }) ? "left" :
                 ctx.editor.isActive({ textAlign: "center" }) ? "center" :
                 ctx.editor.isActive({ textAlign: "right" }) ? "right" : null,
      h: [1, 2, 3, 4, 5, 6].find((l) =>
        ctx.editor.isActive("heading", { level: l })
      ) ?? 0,
      canUndo: ctx.editor.can().undo(),
      canRedo: ctx.editor.can().redo(),
    }),
  });

  const setHeading = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "p") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(val) as 1 | 2 | 3 | 4 | 5 | 6 })
        .run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImageFromUrl = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      showToast?.(error, "error");
      e.target.value = "";
      return;
    }

    setImageUploading(true);
    try {
      const compressed = await compressImage(file, { maxSizeMB: 1, maxWidthOrHeight: 1200 });
      const formData = new FormData();
      formData.append("image", compressed);

      const api = new APIClient<{ url: string }>("/blogs/content-image");
      const res = await api.postFile(formData);
      if (res.data?.url) editor.chain().focus().setImage({ src: IMAGE_URL + res.data.url }).run();
    } catch {
      showToast?.("Failed to upload image", "error");
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 rounded-t-xl transition-colors duration-300">
      {/* Heading Dropdown */}
      <select
        value={s.h || "p"}
        onChange={setHeading}
        className="h-8 px-2 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold 
          border border-gray-300 dark:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
          cursor-pointer min-w-20 transition-colors duration-200"
      >
        <option value="p">Paragraph</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">Heading 5</option>
        <option value="6">Heading 6</option>
      </select>

      <Divider />

      {/* Text formatting */}
      <Btn tooltip="Bold (Ctrl+B)" active={s.isBold}
        onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={14} />
      </Btn>
      <Btn tooltip="Italic (Ctrl+I)" active={s.isItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={14} />
      </Btn>
      <Btn tooltip="Strikethrough" active={s.isStrike}
        onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough size={14} />
      </Btn>

      <Divider />

      {/* Lists */}
      <Btn tooltip="Bullet List" active={s.isBullet}
        onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={14} />
      </Btn>
      <Btn tooltip="Numbered List" active={s.isOrdered}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered size={14} />
      </Btn>

      <Divider />

      {/* Alignment */}
      <Btn tooltip="Align Left" active={s.textAlign === "left"}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        <AlignLeft size={14} />
      </Btn>
      <Btn tooltip="Align Center" active={s.textAlign === "center"}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}>
        <AlignCenter size={14} />
      </Btn>
      <Btn tooltip="Align Right" active={s.textAlign === "right"}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}>
        <AlignRight size={14} />
      </Btn>

      <Divider />

      {/* Blocks */}
      <Btn tooltip="Blockquote" active={s.isQuote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote size={14} />
      </Btn>
      <Btn tooltip="Horizontal Rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={14} />
      </Btn>

      <Divider />

      {/* Link & Image */}
      <Btn tooltip="Insert Link" active={s.isLink} onClick={addLink}>
        <Link size={14} />
      </Btn>
      <Btn tooltip="Upload Image from Computer" disabled={imageUploading} onClick={triggerImageUpload}>
        <Image size={14} />
      </Btn>
      <Btn tooltip="Insert Image by URL" onClick={addImageFromUrl}>
        <ExternalLink size={14} />
      </Btn>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg,image/tiff,.tif,.tiff"
        className="hidden"
        onChange={handleImageFile}
      />

      <Divider />

      {/* Table */}
      <Btn tooltip="Insert Table" onClick={insertTable}>
        <Table size={14} />
      </Btn>
      {editor.isActive("table") && (
        <>
          <button 
            type="button" 
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            className="text-[10px] px-2 h-8 rounded-md bg-gray-100 dark:bg-gray-800 
              text-gray-700 dark:text-gray-300 
              hover:bg-gray-200 dark:hover:bg-gray-700 
              border border-gray-300 dark:border-gray-600
              transition-all duration-200 font-medium cursor-pointer"
          >
            +Col
          </button>
          <button 
            type="button" 
            onClick={() => editor.chain().focus().addRowAfter().run()}
            className="text-[10px] px-2 h-8 rounded-md bg-gray-100 dark:bg-gray-800 
              text-gray-700 dark:text-gray-300 
              hover:bg-gray-200 dark:hover:bg-gray-700 
              border border-gray-300 dark:border-gray-600
              transition-all duration-200 font-medium cursor-pointer"
          >
            +Row
          </button>
          <button 
            type="button" 
            onClick={() => editor.chain().focus().deleteColumn().run()}
            className="text-[10px] px-2 h-8 rounded-md bg-gray-100 dark:bg-gray-800 
              text-red-600 dark:text-red-400 
              hover:bg-red-50 dark:hover:bg-red-950 
              border border-gray-300 dark:border-gray-600
              transition-all duration-200 font-medium cursor-pointer"
          >
            -Col
          </button>
          <button 
            type="button" 
            onClick={() => editor.chain().focus().deleteRow().run()}
            className="text-[10px] px-2 h-8 rounded-md bg-gray-100 dark:bg-gray-800 
              text-red-600 dark:text-red-400 
              hover:bg-red-50 dark:hover:bg-red-950 
              border border-gray-300 dark:border-gray-600
              transition-all duration-200 font-medium cursor-pointer"
          >
            -Row
          </button>
          <button 
            type="button" 
            onClick={() => editor.chain().focus().deleteTable().run()}
            className="text-[10px] px-2 h-8 rounded-md bg-red-100 dark:bg-red-950 
              text-red-700 dark:text-red-400 
              hover:bg-red-200 dark:hover:bg-red-900 
              border border-red-300 dark:border-red-800
              transition-all duration-200 font-medium cursor-pointer"
          >
            Del Table
          </button>
        </>
      )}

      <Divider />

      {/* Undo / Redo */}
      <div className="flex gap-1 ml-auto">
        <Btn tooltip="Undo (Ctrl+Z)" disabled={!s.canUndo}
          onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={14} />
        </Btn>
        <Btn tooltip="Redo (Ctrl+Y)" disabled={!s.canRedo}
          onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={14} />
        </Btn>
      </div>
    </div>
  );
};

export default BlogToolbar;