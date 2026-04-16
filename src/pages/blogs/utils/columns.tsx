import { IMAGE_URL } from "../../../constants";
import img from "../../../assets/applogo.webp";
import type { Blog } from "../model/BlogsModel";

export const BlogColumns = [
  {
    label: "Image",
    accessor: "image" as keyof Blog,
    render: (row: Blog) => {
      const defaultAvatar = img;

      const hasImage = row.featuredImage && row.featuredImage !== "";
      const imageUrl = hasImage ? `${IMAGE_URL}${row.featuredImage}` : defaultAvatar;
      return (
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={imageUrl}
            alt={row.featuredImageAlt ?? "Blog Image"}
            className="w-18 cursor-pointer h-18 rounded-md object-cover border shadow-sm" // ← updated
          /></a>
      );
    },
  },
  {
    label: "Blog Title",
    accessor: "blog",
    render: (row: Blog) => `${row.title}`
  },
  {
  label: "Published On",
  accessor: "publishDate",
  render: (row: Blog) => {
    if (!row.publishDate) return "-";

    const date = new Date(row.publishDate);

    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kathmandu",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },
},
{
  label: "Status",
  accessor: "status",
  render: (row: Blog) => {
    const status = row.status;

    let colorClasses = "";

    switch (status) {
      case "DRAFT":
        colorClasses = "bg-yellow-100 text-yellow-700";
        break;
      case "PUBLISHED":
        colorClasses = "bg-green-100 text-green-700";
        break;
      case "SCHEDULED":
        colorClasses = "bg-blue-100 text-blue-700";
        break;
      default:
        colorClasses = "bg-gray-100 text-gray-600";
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClasses}`}
      >
        {status}
      </span>
    );
  },
}
];
