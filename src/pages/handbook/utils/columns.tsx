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
    if (!row.file && !row.link) {
      return <span className="text-gray-400">No file</span>;
    }

    const url = row.file
      ? `${IMAGE_URL}${row.file}` 
      : row.link;                

    return (
      <button
        onClick={() => window.open(url!, "_blank")}
        className="px-3 py-1 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition"
      >
        Open File
      </button>
    );
  },
},

];
