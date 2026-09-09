import campusHero from "../../../assets/infrastructure/campus-hero.webp";

import blockLaligurans from "../../../assets/infrastructure/block-laligurans.webp";
import blockSayapatri from "../../../assets/infrastructure/block-sayapatri.webp";
import blockDanphe from "../../../assets/infrastructure/block-danphe.webp";
import blockSaras from "../../../assets/infrastructure/block-saras.webp";
import blockSuga from "../../../assets/infrastructure/block-suga.webp";

import classroom01 from "../../../assets/infrastructure/classroom-01.webp";
import classroom02 from "../../../assets/infrastructure/classroom-02.webp";
import classroom03 from "../../../assets/infrastructure/classroom-03.webp";
import classroom04 from "../../../assets/infrastructure/classroom-04.webp";

import seminarHall01 from "../../../assets/infrastructure/seminar-hall-01.webp";
import seminarHall02 from "../../../assets/infrastructure/seminar-hall-02.webp";
import seminarHall03 from "../../../assets/infrastructure/seminar-hall-03.webp";
import seminarHall04 from "../../../assets/infrastructure/seminar-hall-04.webp";

import avRoom01 from "../../../assets/infrastructure/av-room-01.webp";
import avRoom02 from "../../../assets/infrastructure/av-room-02.webp";

import serverRoom01 from "../../../assets/infrastructure/server-room-01.webp";
import serverRoom02 from "../../../assets/infrastructure/server-room-02.webp";

import infirmary01 from "../../../assets/infrastructure/infirmary-01.webp";
import infirmary02 from "../../../assets/infrastructure/infirmary-02.webp";

import meetingRoom01 from "../../../assets/infrastructure/meeting-room-01.webp";
import studentSupport01 from "../../../assets/infrastructure/student-support-01.webp";

import reception01 from "../../../assets/infrastructure/reception-01.webp";
import reception02 from "../../../assets/infrastructure/reception-02.webp";
import reception03 from "../../../assets/infrastructure/reception-03.webp";

import corridor01 from "../../../assets/infrastructure/corridor-01.webp";
import corridor02 from "../../../assets/infrastructure/corridor-02.webp";

import facultyRoom01 from "../../../assets/infrastructure/faculty-room-01.webp";
import office01 from "../../../assets/infrastructure/office-01.webp";
import office02 from "../../../assets/infrastructure/office-02.webp";

export { campusHero };

/* =======================
   Headline numbers
======================= */

export interface CampusStat {
  value: number;
  /** Rendered after the counted value, e.g. "+" or " sq. ft." */
  suffix: string;
  /** Rendered before the counted value, e.g. "~" */
  prefix?: string;
  label: string;
}

export const campusStats: CampusStat[] = [
  { value: 7, suffix: " Ropani", label: "Campus land in the heart of Kathmandu" },
  { value: 50000, suffix: "+ sq. ft.", label: "Total built-up area" },
  { value: 6, suffix: "", label: "Academic and administrative blocks" },
  { value: 90, prefix: "~", suffix: "", label: "Rooms and functional spaces" },
];

/* =======================
   Infrastructure at a glance
======================= */

export interface GlanceRow {
  category: string;
  facilities: string;
}

export const glanceRows: GlanceRow[] = [
  { category: "Academic and administrative blocks", facilities: "6" },
  { category: "Identified rooms and functional spaces", facilities: "Approximately 90" },
  { category: "Classrooms and tutorial rooms", facilities: "32" },
  { category: "Lecture and seminar halls", facilities: "2" },
  { category: "Computer and specialised laboratories", facilities: "7" },
  { category: "Physical and digital library spaces", facilities: "2" },
  { category: "Learning hubs and collaborative spaces", facilities: "3" },
  { category: "Meeting rooms", facilities: "3" },
  { category: "Dedicated server room", facilities: "1" },
  { category: "Software Development Wing", facilities: "1" },
  { category: "Training and Placement Cell", facilities: "1" },
  { category: "Alumni Cell", facilities: "1" },
  { category: "Infirmary", facilities: "1" },
  { category: "Audio-visual room", facilities: "1" },
  { category: "Café and canteen", facilities: "2" },
  { category: "Blocks with parking facilities", facilities: "3" },
  {
    category: "Indoor and outdoor recreation",
    facilities: "Basketball, table tennis, carrom, chess and foosball",
  },
];

/* =======================
   Campus blocks
======================= */

export interface CampusBlock {
  name: string;
  /** Undefined for blocks we do not yet have a photograph of. */
  image?: string;
  description: string;
  tags: string[];
}

export const campusBlocks: CampusBlock[] = [
  {
    name: "Laligurans",
    image: blockLaligurans,
    description:
      "One of the principal academic blocks, housing classrooms, tutorial rooms and student-facing departments, with parking available on site.",
    tags: ["Classrooms", "Parking"],
  },
  {
    name: "Saypatri",
    image: blockSayapatri,
    description:
      "A dedicated teaching and administrative block supporting day-to-day academic delivery and institutional operations.",
    tags: ["Academic", "Administration"],
  },
  {
    name: "Sunkhari",
    description:
      "Supports academic and operational functions, and is one of the three blocks offering on-site parking for students, staff and visitors.",
    tags: ["Academic", "Parking"],
  },
  {
    name: "Danphe",
    image: blockDanphe,
    description:
      "Hosts learning and support spaces alongside parking facilities, forming part of the campus's student services corridor.",
    tags: ["Student services", "Parking"],
  },
  {
    name: "Saras",
    image: blockSaras,
    description:
      "Provides classrooms, faculty spaces and functional rooms that support programme delivery across the college.",
    tags: ["Classrooms", "Faculty"],
  },
  {
    name: "Suga",
    image: blockSuga,
    description:
      "Accommodates academic, administrative and support functions that keep the wider campus ecosystem running.",
    tags: ["Academic", "Support"],
  },
];

/* =======================
   Facility gallery
======================= */

export type FacilityCategory =
  | "Learning Spaces"
  | "Technology"
  | "Student Support"
  | "Campus Areas";

export const facilityCategories: FacilityCategory[] = [
  "Learning Spaces",
  "Technology",
  "Student Support",
  "Campus Areas",
];

export interface FacilityImage {
  src: string;
  title: string;
  caption: string;
  category: FacilityCategory;
}

export const facilityImages: FacilityImage[] = [
  /* ---- Learning Spaces ---- */
  {
    src: classroom01,
    title: "Classroom",
    caption: "One of 32 classrooms and tutorial rooms across the six campus blocks.",
    category: "Learning Spaces",
  },
  {
    src: classroom02,
    title: "Smart Classroom",
    caption: "Display-equipped classroom set up for technology-enabled teaching.",
    category: "Learning Spaces",
  },
  {
    src: classroom03,
    title: "Tutorial Room",
    caption: "Smaller tutorial room used for group work and guided practice sessions.",
    category: "Learning Spaces",
  },
  {
    src: classroom04,
    title: "Teaching Room",
    caption: "Naturally lit teaching space with writing boards and a wall-mounted display.",
    category: "Learning Spaces",
  },
  {
    src: seminarHall01,
    title: "Lecture Hall",
    caption: "Tiered seating and a large display for lectures, orientations and guest sessions.",
    category: "Learning Spaces",
  },
  {
    src: seminarHall02,
    title: "Seminar Hall",
    caption: "Flexible seating that reconfigures for seminars, workshops and presentations.",
    category: "Learning Spaces",
  },
  {
    src: seminarHall03,
    title: "Collaborative Learning Hub",
    caption: "One of three collaborative spaces designed for project and team-based learning.",
    category: "Learning Spaces",
  },
  {
    src: seminarHall04,
    title: "Examination Hall",
    caption: "Projection-ready hall supporting examinations, training and departmental sessions.",
    category: "Learning Spaces",
  },

  /* ---- Technology ---- */
  {
    src: serverRoom01,
    title: "Server Room",
    caption: "A secure, dedicated server room with UPS backup powering campus-wide IT services.",
    category: "Technology",
  },
  {
    src: serverRoom02,
    title: "Network Rack",
    caption: "Structured cabling and rack infrastructure maintained by the college IT team.",
    category: "Technology",
  },
  {
    src: avRoom01,
    title: "Audio-Visual Room",
    caption: "Acoustically treated audio-visual room for recorded sessions and presentations.",
    category: "Technology",
  },
  {
    src: avRoom02,
    title: "AV Presentation Room",
    caption: "Large-format display and integrated sound for media-led teaching.",
    category: "Technology",
  },

  /* ---- Student Support ---- */
  {
    src: studentSupport01,
    title: "Student Support Department",
    caption: "Front-line desk for admissions guidance, counselling and day-to-day student queries.",
    category: "Student Support",
  },
  {
    src: infirmary01,
    title: "Infirmary",
    caption: "On-campus infirmary providing first aid and short-term rest for unwell students.",
    category: "Student Support",
  },
  {
    src: infirmary02,
    title: "Infirmary Beds",
    caption: "Dedicated beds and clinical space supporting student health and wellbeing.",
    category: "Student Support",
  },
  {
    src: meetingRoom01,
    title: "Meeting Room",
    caption: "One of three meeting rooms used by departments, committees and industry partners.",
    category: "Student Support",
  },
  {
    src: facultyRoom01,
    title: "Faculty Room",
    caption: "Shared faculty workspace with dedicated stations for academic staff.",
    category: "Student Support",
  },

  /* ---- Campus Areas ---- */
  {
    src: reception01,
    title: "Reception",
    caption: "The main reception, the first point of contact for students and visitors.",
    category: "Campus Areas",
  },
  {
    src: reception02,
    title: "Reception Desk",
    caption: "Front desk handling enquiries, visitor registration and campus wayfinding.",
    category: "Campus Areas",
  },
  {
    src: reception03,
    title: "Lobby",
    caption: "Open lobby with informal seating for waiting students and guests.",
    category: "Campus Areas",
  },
  {
    src: corridor01,
    title: "Waiting Area",
    caption: "Corridor seating that doubles as an informal space between classes.",
    category: "Campus Areas",
  },
  {
    src: corridor02,
    title: "Corridor",
    caption: "Wide, well-lit circulation connecting classrooms and departmental offices.",
    category: "Campus Areas",
  },
  {
    src: office01,
    title: "Administrative Office",
    caption: "Open-plan administrative office supporting academic and institutional operations.",
    category: "Campus Areas",
  },
  {
    src: office02,
    title: "Departmental Office",
    caption: "Office space for programme leaders and academic teams.",
    category: "Campus Areas",
  },
];

/* =======================
   Recreation
======================= */

export const recreationActivities = [
  "Basketball",
  "Table Tennis",
  "Carrom",
  "Chess",
  "Foosball",
];
