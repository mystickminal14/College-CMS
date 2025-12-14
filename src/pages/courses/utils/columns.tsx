import { IMAGE_URL } from "../../../constants";
import type { Courses } from "../model/CourseModel";
import img from "../../../assets/applogo.png";

export const CoursesColumns = [
  {
    label: "Image",
    accessor: "image" as keyof Courses,
    render: (row: Courses) => {
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
  {
    label: "Course Name",
    accessor: "title",
    render: (row: Courses) => `${row.prefix} ${row.title}`
  },
  { label: "Duration", accessor: "duration" },
  { label: "Shift", accessor: "shift" ,  render: (row: Courses) => `${row.shift==='BOTH'?"Morning/Evening":row.shift.toLowerCase()} `},
  { label: "Credits", accessor: "credit" },


];
