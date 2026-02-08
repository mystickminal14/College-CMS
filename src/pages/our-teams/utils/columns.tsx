import { IMAGE_URL } from "../../../constants";
import type { Teams } from "../model/TeamsModel";
import img from "../../../assets/applogo.webp";

export const TeamsColumns = [
  {
    label: "Image",
    accessor: "image" as keyof Teams,
    render: (row: Teams) => {
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

  { label: "Name", accessor: "name" },
  { label: "Position", accessor: "position" },
  { label: "Order", accessor: "order" },


];
