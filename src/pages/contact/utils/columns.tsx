import type { Contact } from "../model/ContactModel";

 export const contactColumns = [
    { label: "Full Name", accessor: "name" as keyof Contact },
    { label: "Email", accessor: "email" as keyof Contact },
    { label: "Department", accessor: "department" as keyof Contact },
    { label: "Purpose", accessor: "purpose" as keyof Contact },

  ];