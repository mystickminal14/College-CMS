import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { FaLinkedinIn, FaUsers } from "react-icons/fa";
import { Eye, Target } from "lucide-react";
import Seo from "../../../context/seo";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import { APP_URL, IMAGE_URL } from "../../../constants";
import fallback from "../../../assets/applogo.webp";
import { fadeUp } from "../../comp/animation";
import { useGetPublicClub } from "./hook/useClubsWeb";
import ClubNotFound from "./component/ClubNotFound";
import ClubTeamGrid from "./component/ClubTeamGrid";
import JoinButton from "./component/JoinButton";
import TeamHeading from "./component/TeamHeading";

const ClubDetailWeb = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetPublicClub(slug);
  const club = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
      </div>
    );
  }
  if (isError || !club) return <ClubNotFound />;

  const president = club.president;
  // Highlight the last word of the name, the way other page headers highlight a word.
  const words = club.name.split(" ");
  const highlight = words.length > 1 ? words[words.length - 1] : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title={`${club.name} | Student Clubs | LBEF College`}
        description={`Meet the president and members of ${club.name} at LBEF College.`}
        url={`${APP_URL}/academic-club/${club.slug}`}
      />

      <HeroTitleWithGif
        title={club.name}
        highlightedText={highlight}
        subtitle="Meet the president and the team behind the club."
        badgeText="Students Clubs"
        titleClassName={club.name.length > 22 ? "lg:text-5xl! md:text-4xl!" : ""}
      >
        <Link to="/academic-club" className="inline-block mt-6 text-sm text-blue-600 hover:text-blue-800">
          ← All clubs
        </Link>
      </HeroTitleWithGif>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto">
          {/* ================= PRESIDENT ================= */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="mb-8 text-2xl md:text-3xl font-bold text-gray-900">Our President</h3>

            {president ? (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10">
                <div className="lg:col-span-2 flex justify-center">
                  <div className="relative w-full max-w-sm">
                    <div className="absolute -inset-3 rounded-[2rem] bg-linear-to-br from-blue-200 to-cyan-100 -rotate-3" />
                    <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 ring-4 ring-white shadow-xl">
                      <img
                        src={president.image ? `${IMAGE_URL}${president.image}` : fallback}
                        alt={president.name}
                        className={`w-full h-full ${president.image ? "object-cover object-center" : "object-contain p-16 opacity-60"}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <span className="inline-block text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                    {club.name}
                  </span>
                  <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">{president.name}</h2>
                  <p className="mt-1 text-lg font-medium text-blue-700">{president.designation}</p>

                  {(president.semester || president.pastExperiences) && (
                    <dl className="mt-6 pt-6 border-t border-gray-100 space-y-4 text-gray-800">
                      {president.semester && (
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Current Semester</dt>
                          <dd className="mt-1 text-lg">{president.semester}</dd>
                        </div>
                      )}
                      {president.pastExperiences && (
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Past Experiences</dt>
                          <dd className="mt-1 text-lg leading-relaxed">{president.pastExperiences}</dd>
                        </div>
                      )}
                    </dl>
                  )}

                  <div className="mt-8 flex flex-wrap gap-4">
                    {president.linkedIn && (
                      <a
                        href={president.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0A66C2] text-white font-medium shadow-sm hover:bg-[#004182] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                      >
                        <FaLinkedinIn /> Connect with President
                      </a>
                    )}
                    <Link
                      to={`/academic-club/${club.slug}/members`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                    >
                      <FaUsers /> View Club Members
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">The president for this club will be announced soon.</p>
            )}
          </motion.section>

          {/* ================= MISSION & VISION ================= */}
          {(club.mission || club.vision) && (
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {club.vision && (
                <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 text-white shadow-sm">
                      <Eye className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">{club.vision}</p>
                </div>
              )}
              {club.mission && (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 text-white shadow-sm">
                      <Target className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">{club.mission}</p>
                </div>
              )}
            </motion.section>
          )}

          {/* ================= TEAM ================= */}
          <section className="pb-24">
            <TeamHeading>{club.joinFormUrl && <JoinButton url={club.joinFormUrl} />}</TeamHeading>
            <ClubTeamGrid slug={club.slug} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClubDetailWeb;
