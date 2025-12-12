import { IMAGE_URL } from "../../../constants";
import type { Alumni } from "../model/AlumniModel";
import img from "../../../assets/applogo.png";

export const AlumniColumns = [
  {
    label: "Image",
    accessor: "image" as keyof Alumni,
    render: (row: Alumni) => {
      const defaultAvatar = img;

      const hasImage = row.image && row.image !== "";
      const imageUrl = hasImage ? `${IMAGE_URL}${row.image}` : defaultAvatar;
      return (
        <img
          src={imageUrl}
          alt="User"
          className="w-18 h-18 rounded-md object-cover border shadow-sm" // ← updated
        />
      );
    },
  },

  { label: "Full Name", accessor: "name" },
  { label: "Position", accessor: "position" },
  { label: "Batch", accessor: "batch" },
  { label: "Course", accessor: "course" },
];
