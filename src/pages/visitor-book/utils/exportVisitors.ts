import type { Visitor } from "../model/VisitorModel";
import { VisitorExportApi } from "../services/VisitorService";
import { formatVisitorIsoDate, formatVisitorTime } from "./visitorTime";

export interface VisitorExportFilters {
  search?: string;
  from?: string;
  to?: string;
}

const COLUMNS: { header: string; width: number; value: (v: Visitor) => string | number }[] = [
  { header: "Code", width: 14, value: (v) => v.code || "" },
  { header: "Name", width: 26, value: (v) => v.name || "" },
  { header: "Phone", width: 18, value: (v) => v.phone || "" },
  { header: "No. of Persons", width: 14, value: (v) => v.numberOfPerson ?? 1 },
  { header: "Purpose", width: 20, value: (v) => v.purpose || "" },
  { header: "Person to Meet", width: 26, value: (v) => v.personToMeet || "" },
  // Nepal date, matching the table; YYYY-MM-DD so it sorts as text in Excel.
  { header: "Date", width: 12, value: (v) => formatVisitorIsoDate(v.visitedDate || v.inTime) },
  { header: "In Time", width: 11, value: (v) => (v.inTime ? formatVisitorTime(v.inTime) : "") },
  { header: "Out Time", width: 11, value: (v) => (v.outTime ? formatVisitorTime(v.outTime) : "") },
  { header: "Status", width: 13, value: (v) => (v.status === "IN" ? "Inside" : "Checked Out") },
  { header: "Note", width: 30, value: (v) => v.note || "" },
];

const fileName = ({ search, from, to }: VisitorExportFilters) => {
  const parts = ["visitors"];
  if (from || to) parts.push(`${from || "start"}_to_${to || "today"}`);
  else parts.push("all");
  if (search) parts.push(search.replace(/[^\w-]+/g, "-").slice(0, 30));
  return `${parts.join("_")}.xlsx`;
};

/**
 * Pulls every visitor matching the filters (all of them when none are set) and
 * saves them as an .xlsx. exceljs is loaded on demand so it stays out of the
 * main admin bundle. Resolves with the
 * number of rows written.
 */
export const exportVisitorsToExcel = async (filters: VisitorExportFilters) => {
  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  if (filters.from) params.append("from", filters.from);
  if (filters.to) params.append("to", filters.to);
  const query = params.toString();

  const [res, { default: ExcelJS }] = await Promise.all([
    VisitorExportApi.getAll(query ? `?${query}` : undefined, { timeout: 60000 }),
    import("exceljs"),
  ]);
  const rows = res.data ?? [];

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Visitors", { views: [{ state: "frozen", ySplit: 1 }] });
  sheet.columns = COLUMNS.map((c) => ({ header: c.header, width: c.width }));
  sheet.getRow(1).font = { bold: true };
  rows.forEach((v) => sheet.addRow(COLUMNS.map((c) => c.value(v))));
  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: COLUMNS.length } };

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName(filters);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  return rows.length;
};
