import { PAGE_SEO_TYPE_LABELS, type PageSeo } from "./model/PageSeoModel";

export const PageSeoColumns = [
  {
    label: "Page",
    accessor: "label",
    render: (row: PageSeo) => (
      <div>
        <p className="font-medium">{row.label}</p>
        <p className="text-xs text-gray-500">{row.path}</p>
      </div>
    ),
  },
  {
    label: "Type",
    accessor: "type",
    render: (row: PageSeo) => PAGE_SEO_TYPE_LABELS[row.type],
  },
  {
    label: "Meta Title",
    accessor: "metaTitle",
    render: (row: PageSeo) => row.metaTitle || "—",
  },
  {
    label: "SEO",
    accessor: "isCustom",
    render: (row: PageSeo) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.isCustom ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
        }`}
      >
        {row.isCustom ? "Custom" : "Default"}
      </span>
    ),
  },
];
