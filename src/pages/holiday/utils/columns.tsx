import { IMAGE_URL } from "../../../constants";
import type { Holidays } from "../model/HolidayModel";
import img from "../../../assets/applogo.png";

export const HolidaysColumns = [
  {
    label: "Image",
    accessor: "image" as keyof Holidays,
    render: (row: Holidays) => {
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

  { label: "Name", accessor: "name" },
  
];
