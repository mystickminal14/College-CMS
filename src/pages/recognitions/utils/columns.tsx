import { IMAGE_URL } from "../../../constants";
import type { Recognitions } from "../model/RecognitionsModel";
import img from "../../../assets/applogo.webp";

export const RecognitionsColumns = [
  {
    label: "Image",
    accessor: "image" as keyof Recognitions,
    render: (row: Recognitions) => {
      const defaultAvatar = img;

      const hasImage = row.image && row.image !== "";
      const imageUrl = hasImage ? `${IMAGE_URL}${row.image}` : defaultAvatar;
      return (
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={imageUrl}
            alt="User"
            className="w-18 h-18 rounded-md object-cover border shadow-sm" // ← updated
          /></a>
      );
    },
  },

  { label: "Name", accessor: "name" },
  { label: "Type", accessor: "type" },

];
