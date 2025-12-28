
import type { EditorialMember } from "../model/EditoralModel";

export const EditorialColumns = [
 

  { label: "Name", accessor: "name" },
  { label: "Designation", accessor: "designation" },
  { label: "Institution", accessor: "institution" },
{
  label: "Honorary Position",
  accessor: "honoraryPosition",
  render: (row: EditorialMember) =>
    row.honoraryPosition
      .toLowerCase()             
      .replace(/_/g, " ")            
      .replace(/\b\w/g, char => char.toUpperCase()) 
}
,  { label: "Country", accessor: "country" },
  
];
