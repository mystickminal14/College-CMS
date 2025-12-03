import { format } from "date-fns";

export const parseDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  } catch {
    return dateString;
  }
};