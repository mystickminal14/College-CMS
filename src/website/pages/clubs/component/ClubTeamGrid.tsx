import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../comp/animation";
import { useGetPublicClubMembers } from "../hook/useClubsWeb";
import ClubTeamCard from "./ClubTeamCard";

const MEMBERS_PER_PAGE = 12;

const Skeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-square rounded-lg bg-gray-200" />
    <div className="h-5 bg-gray-200 rounded w-2/3 mt-4" />
    <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
  </div>
);

// The paginated team grid shared by the club page and the "View club members" page.
const ClubTeamGrid = ({ slug }: { slug?: string }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useGetPublicClubMembers(slug, page, MEMBERS_PER_PAGE);

  const members = data?.data?.members ?? [];
  const pagination = data?.pagination;

  if (isError) {
    return <p className="text-center text-red-600">Failed to load the team. Please try again later.</p>;
  }

  const goTo = (p: number) => {
    setPage(p);
    document.getElementById("club-team")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="club-team" className="scroll-mt-24">
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)}
        </div>
      ) : members.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No members have been added yet.</p>
      ) : (
        <motion.div
          key={page}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 transition-opacity ${isFetching ? "opacity-60" : ""}`}
        >
          {members.map((m) => (
            <motion.div key={m.id} variants={fadeUp} whileHover={{ y: -6 }} className="h-full">
              <ClubTeamCard member={m} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <nav aria-label="Team pages" className="flex flex-wrap items-center justify-center gap-2 mt-10">
          <button
            onClick={() => goTo(page - 1)}
            disabled={!pagination.hasPrevPage}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50"
          >
            Previous
          </button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => goTo(n)}
              aria-current={n === pagination.page ? "page" : undefined}
              className={`w-10 h-10 rounded-lg border text-sm font-medium transition ${
                n === pagination.page
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => goTo(page + 1)}
            disabled={!pagination.hasNextPage}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
};

export default ClubTeamGrid;
