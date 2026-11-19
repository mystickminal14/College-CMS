import { AnimatePresence, motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowRight, FaLinkedinIn, FaUsers } from "react-icons/fa";
import { CalendarDays, Cloud, Cpu, GraduationCap, HeartHandshake, Landmark, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import Seo from "../../../context/seo";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import { APP_URL, IMAGE_URL } from "../../../constants";
import fallback from "../../../assets/applogo.webp";
import { useGetPublicClubs } from "./hook/useClubsWeb";
import ClubRichText from "./component/ClubRichText";
import JoinButton from "./component/JoinButton";

// Same accent colours the old Academic Clubs page used, cycled per club.
const THEMES = [
  { color: "from-blue-500 to-cyan-500", bg: "bg-blue-50", border: "border-blue-200" },
  { color: "from-purple-500 to-pink-500", bg: "bg-purple-50", border: "border-purple-200" },
  { color: "from-green-500 to-emerald-500", bg: "bg-green-50", border: "border-green-200" },
  { color: "from-orange-500 to-red-500", bg: "bg-orange-50", border: "border-orange-200" },
  { color: "from-teal-500 to-blue-500", bg: "bg-teal-50", border: "border-teal-200" },
  { color: "from-indigo-500 to-purple-500", bg: "bg-indigo-50", border: "border-indigo-200" },
];

// An icon per club (matched on the slug), so the tabs stay compact and do not depend on uploaded logos.
const ICONS: [string, LucideIcon][] = [
  ["representative", Landmark],
  ["it-club", Cpu],
  ["event", CalendarDays],
  ["entrepreneur", Rocket],
  ["aws", Cloud],
  ["leo", HeartHandshake],
  ["lbef", GraduationCap],
];
const iconFor = (slug: string): LucideIcon => ICONS.find(([key]) => slug.includes(key))?.[1] ?? Sparkles;

const Block = ({ title, text, color }: { title: string; text: string; color: string }) => (
  <div>
    <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
      <span className={`w-2 h-6 rounded-full bg-linear-to-b ${color}`} />
      {title}
    </h4>
    <ClubRichText html={text} className="text-gray-600 leading-relaxed pl-4" />
  </div>
);

const ClubsWeb = () => {
  const { data, isLoading, isError } = useGetPublicClubs();
  const clubs = data?.data ?? [];

  // The chosen club lives in the URL (?club=slug) so it can be shared and Back works.
  const [params, setParams] = useSearchParams();
  const requested = params.get("club");
  const activeIndex = Math.max(0, clubs.findIndex((c) => c.slug === requested));
  const club = clubs[activeIndex];
  const theme = THEMES[activeIndex % THEMES.length];
  const president = club?.president;

  const select = (slug: string) => setParams({ club: slug }, { replace: true });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Seo
        title="Student Clubs | LBEF College"
        description="Explore the student-led clubs at LBEF College, read their vision and mission, meet their presidents and members, and join a club."
        url={`${APP_URL}/academic-club`}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroTitleWithGif
          title="Students Clubs"
          highlightedText="Clubs"
          subtitle="Student-led clubs where you explore your interests, build leadership and teamwork skills, and grow with confidence."
          badgeText="Students Clubs"
        />

        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="h-96 rounded-2xl bg-white border border-gray-100 animate-pulse" />
          ) : isError ? (
            <p className="text-center text-red-600">Failed to load clubs. Please try again later.</p>
          ) : !club ? (
            <p className="text-center text-gray-500">No clubs available yet.</p>
          ) : (
            <>
              {/* Club tabs: they wrap onto more lines instead of scrolling sideways. */}
              <div
                role="tablist"
                aria-label="Clubs"
                className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 mb-8"
              >
                {clubs.map((c, index) => {
                  const t = THEMES[index % THEMES.length];
                  const Icon = iconFor(c.slug);
                  const active = index === activeIndex;
                  return (
                    <motion.button
                      key={c.id}
                      role="tab"
                      aria-selected={active}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 * index }}
                      onClick={() => select(c.slug)}
                      className={`cursor-pointer flex items-center gap-2.5 px-3 py-3 rounded-lg text-left transition-all duration-300 ${
                        active
                          ? `${t.bg} border-2 ${t.border} shadow-lg scale-[1.02]`
                          : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <span className={`p-1.5 rounded-md bg-linear-to-br ${t.color} shrink-0`}>
                        <Icon className="w-4 h-4 text-white" />
                      </span>
                      <span className={`font-medium text-xs leading-tight ${active ? "text-gray-900" : "text-gray-600"}`}>
                        {c.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Selected club */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={club.slug}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-24"
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className={`p-8 ${theme.bg} border-b ${theme.border}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <span className={`p-1 rounded-full bg-linear-to-br ${theme.color} shrink-0`}>
                            <img
                              src={club.image ? `${IMAGE_URL}${club.image}` : fallback}
                              alt=""
                              className="h-16 w-16 rounded-full bg-white object-cover"
                            />
                          </span>
                          <div>
                            <h2 className="text-xl sm:text-3xl font-bold text-gray-900">{club.name}</h2>
                            <div className="h-1 w-20 mt-2 rounded-full bg-linear-to-r from-gray-300 to-transparent" />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {club.joinFormUrl && <JoinButton url={club.joinFormUrl} />}
                          <Link
                            to={`/academic-club/${club.slug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300 whitespace-nowrap"
                          >
                            View Club <FaArrowRight className="text-xs" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 grid md:grid-cols-2 gap-8">
                      <div className="space-y-8">
                        {club.vision && <Block title="Vision" text={club.vision} color={theme.color} />}
                        {club.mission && <Block title="Mission" text={club.mission} color={theme.color} />}
                        {!club.vision && !club.mission && (
                          <p className="text-gray-500">The vision and mission of this club will be added soon.</p>
                        )}
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span className={`w-2 h-6 rounded-full bg-linear-to-b ${theme.color}`} />
                          President
                        </h4>
                        {president ? (
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                            <img
                              src={president.image ? `${IMAGE_URL}${president.image}` : fallback}
                              alt={president.name}
                              className={`h-24 w-24 rounded-xl shrink-0 bg-gray-100 ${
                                president.image ? "object-cover" : "object-contain p-4 opacity-60"
                              }`}
                            />
                            <div className="min-w-0">
                              <p className="text-lg font-bold text-gray-900">{president.name}</p>
                              <p className="text-sm text-gray-600">{president.designation}</p>
                              {president.semester && (
                                <p className="mt-1 text-sm text-gray-500">Semester {president.semester}</p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500">The president will be announced soon.</p>
                        )}

                        <div className="mt-6 flex flex-wrap gap-3">
                          {president?.linkedIn && (
                            <a
                              href={president.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                            >
                              <FaLinkedinIn /> Connect with President
                            </a>
                          )}
                          <Link
                            to={`/academic-club/${club.slug}/members`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                          >
                            <FaUsers /> View Club Members
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubsWeb;
