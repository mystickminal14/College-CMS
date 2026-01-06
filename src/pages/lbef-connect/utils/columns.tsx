import { IMAGE_URL } from "../../../constants"; // use if files are stored in a URL base
import type { Connects } from "../model/Connects";
import img from '../../../assets/applogo.webp'
export const ConnectsColumns = [
  {
    label: "Image",
    accessor: "image" as keyof Connects,
    render: (row: Connects) => {
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
            className="w-18 cursor-pointer h-18 rounded-md object-cover border shadow-sm" // ← updated
          /></a>
      );
    },
  },

  {
    label: "Volume",
    accessor: "volume" as keyof Connects,
  },
  {
    label: "Issue",
    accessor: "issue" as keyof Connects,
  },
  {
    label: "File",
    accessor: "file" as keyof Connects,
    render: (row: Connects) => {
      if (!row.file) return <span className="text-gray-400">No file</span>;

      const fileUrl = `${IMAGE_URL}${row.file}`;

      return (
        <button
          onClick={fileUrl ? () => window.open(fileUrl, "_blank") : undefined}
          className="px-3 py-1 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition"
        >
          Open File
        </button>
      );
    },
  },
];
