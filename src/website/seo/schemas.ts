// Schema.org JSON-LD for the public site, supplied by the marketing team.
// Rendered through <JsonLd> on the matching pages.
import logo from "../../assets/partners/lbef.webp";

const SITE = "https://www.lbef.org";
const ORG_ID = `${SITE}/#organization`;
const ORG_NAME = "Lord Buddha Education Foundation";
const ADMISSION_URL = `${SITE}/admission-procedure`;

const address = {
  "@type": "PostalAddress",
  streetAddress: "Opp. Maitidevi Temple, Maitidevi",
  addressLocality: "Kathmandu",
  postalCode: "44600",
  addressCountry: "NP",
};

const sameAs = [
  "https://www.facebook.com/lbefcampus",
  "https://www.instagram.com/lbefcollege/",
  "https://www.linkedin.com/company/lbefcampus",
];

// Built asset path, so the URL stays valid when Vite changes the hash.
const logoUrl = new URL(logo, SITE).href;

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollegeOrUniversity",
      "@id": ORG_ID,
      name: ORG_NAME,
      alternateName: ["LBEF College", "The First IT College of Nepal"],
      url: `${SITE}/`,
      logo: logoUrl,
      description:
        "Nepal’s first IT college, established in 1998. Offers internationally recognized Bachelor’s and Master’s programs in IT and Management in academic collaboration with Asia Pacific University of Technology & Innovation (APU), Malaysia. Approved by the Ministry of Education and recognized by Tribhuvan University.",
      foundingDate: "1998",
      founder: { "@type": "Person", name: "Late Parmanand Kejriwal" },
      address,
      telephone: ["+977-9801110200", "+977-9801110600", "+977-01-4544356"],
      email: "study@lbef.edu.np",
      sameAs,
      alumni: "14000+",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "LBEF College",
      publisher: { "@id": ORG_ID },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "@id": ORG_ID,
  name: ORG_NAME,
  alternateName: ["LBEF College", "The First IT College of Nepal"],
  url: `${SITE}/`,
  logo: logoUrl,
  description:
    "Established in 1998 as Nepal’s first IT college. Offers industry-focused Bachelor’s and Master’s programs in collaboration with Asia Pacific University (APU), Malaysia. Currently serves over 1,500 students with more than 14,000 alumni worldwide.",
  foundingDate: "1998",
  founder: {
    "@type": "Person",
    name: "Late Parmanand Kejriwal",
    description: "Founder of LBEF Group of Institutions (12 July 1955 – 20 June 2021)",
  },
  address,
  telephone: ["+977-9801110200", "+977-9801110600"],
  email: "study@lbef.edu.np",
  sameAs,
};

export const contactSchema = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "@id": ORG_ID,
  name: ORG_NAME,
  url: `${SITE}/`,
  address,
  telephone: ["+977-9801110200", "+977-9801110600", "+977-01-4544356"],
  email: "study@lbef.edu.np",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Admissions",
      telephone: "+977-9801110200",
      email: "study@lbef.edu.np",
      availableLanguage: ["English", "Nepali"],
    },
    {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "studentssection@lbef.edu.np",
    },
  ],
};

/* ------------------ Courses ------------------ */

interface CourseEntry {
  slug: string;
  name: string;
  /** Short description used in the /courses ItemList. */
  listDescription: string;
  /** Full description used on the course's own page. */
  description: string;
  credential: string;
  years: 2 | 3;
  credits?: number;
}

const courses: CourseEntry[] = [
  {
    slug: "bscit",
    name: "B.Sc. (Hons) Information Technology",
    listDescription: "Full-time 3-year campus-based Bachelor of Science (Honours) in Information Technology. Degree awarded by Asia Pacific University (APU), Malaysia.",
    description: "A full-time 3-year campus-based Bachelor of Science (Honours) in Information Technology offered by LBEF College in academic collaboration with Asia Pacific University of Technology & Innovation (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "B.Sc. (Hons) Information Technology",
    years: 3,
    credits: 123,
  },
  {
    slug: "bscitce",
    name: "B.Sc. (Hons) Information Technology with a Specialism in Cloud Engineering",
    listDescription: "Full-time 3-year campus-based B.Sc. (Hons) Information Technology with specialization in Cloud Engineering. Degree awarded by APU, Malaysia.",
    description: "A full-time 3-year campus-based Bachelor of Science (Honours) in Information Technology with a Specialism in Cloud Engineering. Offered by LBEF College in academic collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "B.Sc. (Hons) Information Technology with a Specialism in Cloud Engineering",
    years: 3,
    credits: 123,
  },
  {
    slug: "bscitiot",
    name: "B.Sc. (Hons) Information Technology with a Specialism in Internet of Things (IoT)",
    listDescription: "Full-time 3-year campus-based B.Sc. (Hons) Information Technology with specialization in Internet of Things (IoT). Degree awarded by APU, Malaysia.",
    description: "A full-time 3-year campus-based Bachelor of Science (Honours) in Information Technology with a Specialism in Internet of Things (IoT). Offered by LBEF College in academic collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "B.Sc. (Hons) Information Technology with a Specialism in Internet of Things",
    years: 3,
    credits: 123,
  },
  {
    slug: "bsccs",
    name: "B.Sc. (Hons) Computer Science",
    listDescription: "Full-time 3-year campus-based Bachelor of Science (Honours) in Computer Science. Degree awarded by Asia Pacific University (APU), Malaysia.",
    description: "A full-time 3-year campus-based Bachelor of Science (Honours) in Computer Science offered by LBEF College in academic collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "B.Sc. (Hons) Computer Science",
    years: 3,
    credits: 123,
  },
  {
    slug: "bsccs-cs",
    name: "B.Sc. (Hons) Computer Science with a Specialism in Cyber Security",
    listDescription: "Full-time 3-year campus-based B.Sc. (Hons) Computer Science with specialization in Cyber Security. Degree awarded by APU, Malaysia.",
    description: "A full-time 3-year campus-based Bachelor of Science (Honours) in Computer Science with a Specialism in Cyber Security. Offered by LBEF College in academic collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "B.Sc. (Hons) Computer Science with a Specialism in Cyber Security",
    years: 3,
    credits: 123,
  },
  {
    slug: "bsccs-ai",
    name: "B.Sc. (Hons) Computer Science with a Specialism in Artificial Intelligence",
    listDescription: "Full-time 3-year campus-based B.Sc. (Hons) Computer Science with specialization in Artificial Intelligence. Degree awarded by APU, Malaysia.",
    description: "A full-time 3-year campus-based Bachelor of Science (Honours) in Computer Science with a Specialism in Artificial Intelligence. Offered by LBEF College in academic collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "B.Sc. (Hons) Computer Science with a Specialism in Artificial Intelligence",
    years: 3,
    credits: 123,
  },
  {
    slug: "bsccs-da",
    name: "B.Sc. (Hons) Computer Science with a Specialism in Data Analytics",
    listDescription: "Full-time 3-year campus-based B.Sc. (Hons) Computer Science with specialization in Data Analytics. Degree awarded by APU, Malaysia.",
    description: "A full-time 3-year campus-based Bachelor of Science (Honours) in Computer Science with a Specialism in Data Analytics. Offered by LBEF College in academic collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "B.Sc. (Hons) Computer Science with a Specialism in Data Analytics",
    years: 3,
    credits: 123,
  },
  {
    slug: "mscitm",
    name: "M.Sc. in Information Technology Management",
    listDescription: "Full-time 2-year Master of Science in Information Technology Management (M.Sc. ITM). Degree awarded by Asia Pacific University (APU), Malaysia.",
    description: "A full-time 2-year Master of Science in Information Technology Management (M.Sc. ITM) offered by LBEF College in academic collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "M.Sc. in Information Technology Management",
    years: 2,
  },
  {
    slug: "mba",
    name: "Master of Business Administration",
    listDescription: "Full-time 2-year Master of Business Administration (MBA). Degree awarded by Asia Pacific University (APU), Malaysia.",
    description: "A full-time 2-year Master of Business Administration (MBA) offered by LBEF College in academic collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "Master of Business Administration",
    years: 2,
  },
  {
    slug: "mba-ai",
    name: "MBA with a Specialism in Artificial Intelligence",
    listDescription: "Full-time 2-year Master of Business Administration with specialization in Artificial Intelligence. Degree awarded by APU, Malaysia.",
    description: "A full-time 2-year Master of Business Administration with a Specialism in Artificial Intelligence. Focuses on applying AI in business strategy and decision-making. Offered by LBEF College in collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "Master of Business Administration with a Specialism in Artificial Intelligence",
    years: 2,
  },
  {
    slug: "mba-dl",
    name: "MBA with a Specialism in Digital Leadership",
    listDescription: "Full-time 2-year Master of Business Administration with specialization in Digital Leadership. Degree awarded by APU, Malaysia.",
    description: "A full-time 2-year Master of Business Administration with a Specialism in Digital Leadership. Designed to develop leaders for digital transformation. Offered by LBEF College in collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "Master of Business Administration with a Specialism in Digital Leadership",
    years: 2,
  },
  {
    slug: "mba-htm",
    name: "MBA with a Specialism in Hospitality & Tourism Management",
    listDescription: "Full-time 2-year Master of Business Administration with specialization in Hospitality & Tourism Management. Degree awarded by APU, Malaysia.",
    description: "A full-time 2-year Master of Business Administration with a Specialism in Hospitality & Tourism Management. Offered by LBEF College in academic collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "Master of Business Administration with a Specialism in Hospitality & Tourism Management",
    years: 2,
  },
  {
    slug: "mba-ba",
    name: "MBA with a Specialism in Business Analytics",
    listDescription: "Full-time 2-year Master of Business Administration with specialization in Business Analytics. Degree awarded by APU, Malaysia.",
    description: "A full-time 2-year Master of Business Administration with a Specialism in Business Analytics. Offered by LBEF College in academic collaboration with Asia Pacific University (APU), Malaysia. Degree recognized by Tribhuvan University, Nepal.",
    credential: "Master of Business Administration with a Specialism in Business Analytics",
    years: 2,
  },
];

export const coursesListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "IT & Management Courses at LBEF College",
  description:
    "Complete list of Bachelor’s and Master’s programs offered by LBEF College (Nepal’s First IT College) in academic collaboration with Asia Pacific University of Technology & Innovation (APU), Malaysia. All degrees are recognized by Tribhuvan University, Nepal.",
  numberOfItems: courses.length,
  itemListElement: courses.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: c.name,
      description: c.listDescription,
      provider: { "@type": "CollegeOrUniversity", "@id": ORG_ID, name: ORG_NAME },
      url: `${SITE}/${c.slug}`,
    },
  })),
};

/** Course JSON-LD for a course detail page, or null if the slug has none. */
export function getCourseSchema(slug: string | undefined) {
  const c = courses.find((x) => x.slug === slug);
  if (!c) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description: c.description,
    provider: { "@type": "CollegeOrUniversity", "@id": ORG_ID, name: ORG_NAME, url: `${SITE}/` },
    educationalCredentialAwarded: c.credential,
    timeRequired: `P${c.years}Y`,
    ...(c.credits ? { numberOfCredits: c.credits } : {}),
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: "Full-time",
      location: { "@type": "Place", name: "LBEF College", address },
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      availability: "https://schema.org/InStock",
      url: ADMISSION_URL,
    },
  };
}
