import { useState } from "react";
import { FaUsers, FaUserTie } from "react-icons/fa";
import TitleBox from "../../components/layout/TitleBox";
import ClubsSection from "./components/ClubsSection";
import MembersSection from "./components/MembersSection";

type Tab = "clubs" | "members";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "clubs", label: "Clubs", icon: <FaUsers className="w-4 h-4" /> },
  { id: "members", label: "Members", icon: <FaUserTie className="w-4 h-4" /> },
];

const ClubsPage = () => {
  const [tab, setTab] = useState<Tab>("clubs");

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Student Clubs" subtitle="Manage clubs, presidents and members" />

      <div className="flex gap-2 my-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded ${
              tab === t.id
                ? "bg-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {tab === "clubs" ? <ClubsSection /> : <MembersSection />}
    </div>
  );
};

export default ClubsPage;
