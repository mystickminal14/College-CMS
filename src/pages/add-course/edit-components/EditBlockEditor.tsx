import { useQueryClient } from "@tanstack/react-query";
import { BlockType, type CourseDetailBlock } from "../../courses/model/CourseDetailModel";
import EditBlockItem from "./editBlockItem";
import { COURSE_CACHE_KEY } from "../../../constants";
import useAddCourseDetails from "../../courses/hooks/useAddCourseDetails";

interface Props {
  blocks: CourseDetailBlock[];
  onChange: (blocks: CourseDetailBlock[]) => void;
  id?: Number;
  root?: boolean;
  allowSubheading?: boolean;
}

const EditBlockEditor = ({
  blocks,
  onChange,
  id,
  root = true,
  allowSubheading = true,
}: Props) => {
    const addBlock = (type: BlockType) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const order = blocks.length + 1; // new block order = last + 1

    const newBlock: CourseDetailBlock =
      type === BlockType.HEADING || type === BlockType.SUBHEADING
        ? { id, type, order, title: "", children: [] }
        : type === BlockType.PARAGRAPH
        ? { id, type, order, content: "" }
        : { id, type, order, content: [] };

    onChange([...blocks, newBlock]);
  };
  const addDetailsMutation = useAddCourseDetails();
  const queryClient = useQueryClient();

  const handleSave = () => {
    if (!id) return;

    addDetailsMutation.mutate(
      { courseId: Number(id), blocks },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY, id, "details"] });
         
        },
      }
    );
  };
 
  const availableBlocks = root
    ? [BlockType.HEADING]
    : allowSubheading
      ? [BlockType.SUBHEADING, BlockType.PARAGRAPH, BlockType.LIST]
      : [BlockType.PARAGRAPH, BlockType.LIST];

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <EditBlockItem
          key={index}
          block={block}
          onSave={handleSave}
          onUpdate={(updated) => {
            const copy = [...blocks];
            copy[index] = updated;
            onChange(copy);
          }}
          onDelete={() => onChange(blocks.filter((_, i) => i !== index))}
        />
      ))}

      <div className="flex gap-2 flex-wrap items-center">
        {availableBlocks.map((type) => (
          <>
            <button
              key={type}
              onClick={() => addBlock(type)}
              className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition"
            >
              + {type.charAt(0) + type.slice(1).toLowerCase()}
            </button>
        
          </>
        ))}



        
      </div>
      
    </div>
  );
};

export default EditBlockEditor;
