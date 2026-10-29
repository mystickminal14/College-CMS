import { Link, useParams } from "react-router-dom";
import Seo from "../../../context/seo";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import { APP_URL } from "../../../constants";
import { useGetPublicClub } from "./hook/useClubsWeb";
import ClubNotFound from "./component/ClubNotFound";
import ClubTeamGrid from "./component/ClubTeamGrid";
import JoinButton from "./component/JoinButton";
import TeamHeading from "./component/TeamHeading";

const ClubMembersWeb = () => {
  const { slug } = useParams();
  const { data, isError, isLoading } = useGetPublicClub(slug);
  const club = data?.data;

  if (isError || (!isLoading && !club)) return <ClubNotFound />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title={`${club?.name ?? "Club"} Members | LBEF College`}
        description={`Meet the board and members of ${club?.name ?? "the club"} at LBEF College.`}
        url={`${APP_URL}/academic-club/${slug}/members`}
      />

      <HeroTitleWithGif
        title="Meet Our Team"
        highlightedText="Team"
        showBadge={false}
        subtitle={club ? `Board of Directors and members of ${club.name}` : undefined}
      >
        <Link to={`/academic-club/${slug}`} className="inline-block mt-6 text-sm text-blue-600 hover:text-blue-800">
          ← Back to club
        </Link>
      </HeroTitleWithGif>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 pb-24">
        <div className="max-w-7xl mx-auto">
          <TeamHeading>{club?.joinFormUrl && <JoinButton url={club.joinFormUrl} />}</TeamHeading>
          <ClubTeamGrid slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default ClubMembersWeb;
