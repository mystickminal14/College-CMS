import { IMAGE_URL } from "../../../constants";
import type { NewsModel } from "../model/NewsModel";
import img from "../../../assets/applogo.png";

export const NewsModelColumns = [
  {
    label: "Image",
    accessor: "image" as keyof NewsModel,
    render: (row: NewsModel) => {
      const defaultAvatar = img;

      const hasImage = row.image && row.image !== "";
      const imageUrl = hasImage ? `${IMAGE_URL}${row.image}` : defaultAvatar;
      return (
        <img
          src={imageUrl}
          alt="User"
          className="w-18 h-18 rounded-md object-cover border shadow-sm" // ← updated
        />
      );
    },
  },

  { label: "Title", accessor: "title" },
  { label: "Published On", accessor: "publishedOn" },
  { label: "source", accessor: "source" },
];
