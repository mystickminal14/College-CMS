import { IMAGE_URL } from "../../../constants";
import type { Notices, ENotice } from "../model/NoticeModel";

export const NoticeColumns = [
  { label: "Program Name", accessor: "program_name" },
  { label: "Title", accessor: "title" },
  { label: "Date", accessor: "date" },
  {
    label: "File",
    accessor: "file",
    render: (row: Notices) => {

      const handleOpenFile = () => {
        if (row.file) {
          window.open(IMAGE_URL + row.file, "_blank");

        } else {
          alert("No file available");
        }
      };
      return (
        <button
          onClick={handleOpenFile}
          className="px-3 py-1 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition"
        >
          Open File
        </button>
      );
    },
  },
  {
    label: "Notice Type",
    accessor: "type",
    render: (row: Notices) => {
      const type: ENotice = row.type;
      const color =
        type === "ACADEMIC" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800";

      return (
        <span
          className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${color}`}
        >
          {type}
        </span>
      );
    },
  },
];
