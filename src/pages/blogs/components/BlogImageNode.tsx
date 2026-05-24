import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { X } from "lucide-react";

const BlogImageNode = ({ node, deleteNode }: NodeViewProps) => (
  <NodeViewWrapper as="div" className="relative group my-4">
    <img
      src={node.attrs.src}
      alt={node.attrs.alt || ""}
      style={{ margin: 0 }}
      className="max-w-full rounded-lg"
    />
    <button
      type="button"
      title="Remove image"
      onClick={deleteNode}
      className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full
        bg-red-500 hover:bg-red-600 text-white shadow-md
        opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
    >
      <X size={13} />
    </button>
  </NodeViewWrapper>
);

export default BlogImageNode;
