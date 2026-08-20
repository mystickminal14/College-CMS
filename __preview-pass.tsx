import { createRoot } from "react-dom/client";
import "./src/index.css";
import KioskFrame from "./src/pages/visitor-book/kiosk/KioskFrame";
import KioskPass from "./src/pages/visitor-book/kiosk/KioskPass";
import type { VisitorPass } from "./src/pages/visitor-book/model/VisitorModel";

const pass: VisitorPass = {
  code: "V-4821",
  name: "Ramesh Bahadur Shrestha",
  purpose: "Admission enquiry",
  personToMeet: "Er. Sunita Karki",
  numberOfPerson: 2,
  visitedDate: new Date().toISOString(),
  inTime: new Date().toISOString(),
  outTime: null,
  status: "IN",
  photo: null,
};

createRoot(document.getElementById("root")!).render(
  <KioskFrame
    steps={[{ label: "Your details" }, { label: "Photo" }, { label: "Your pass" }]}
    activeIndex={2}
    finished
  >
    <KioskPass pass={pass} qrToken="preview-token-1234567890" onDone={() => {}} />
  </KioskFrame>,
);
