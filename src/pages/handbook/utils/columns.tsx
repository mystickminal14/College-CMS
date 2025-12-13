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
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {row.file.split("/").pop()} {/* shows file name only */}
        </a>
      );
    },
  },
];
