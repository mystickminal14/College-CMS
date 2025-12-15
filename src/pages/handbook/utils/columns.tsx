import { IMAGE_URL } from "../../../constants"; // use if files are stored in a URL base
import type { Downloads } from "../model/handbookModel";

export const DownloadsColumns = [
  {
    label: "Name",
    accessor: "name" as keyof Downloads,
  },
  {
    label: "File",
    accessor: "file" as keyof Downloads,
    render: (row: Downloads) => {
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
