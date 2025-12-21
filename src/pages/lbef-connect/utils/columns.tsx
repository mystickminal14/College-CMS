import { IMAGE_URL } from "../../../constants"; // use if files are stored in a URL base
import type { Connects } from "../model/Connects";

export const ConnectsColumns = [
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

      const fileUrl = `${IMAGE_URL}${row.file}`; // full URL to file

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
