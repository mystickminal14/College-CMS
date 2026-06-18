import { IMAGE_URL } from "../../../constants";
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
      if (!row.file && !row.link) return <span className="text-gray-400">No file</span>;
      const url = row.file ? `${IMAGE_URL}${row.file}` : row.link;
      return (
        <button
          onClick={() => window.open(url!, "_blank")}
          className="px-3 py-1 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition text-xs"
        >
          Open File
        </button>
      );
    },
  },
  {
    label: "Status",
    accessor: "status" as keyof Downloads,
    render: (row: Downloads) => (
      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${row.status === "ENABLED" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
        {row.status ?? "ENABLED"}
      </span>
    ),
  },
];
