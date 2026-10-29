import { Link } from "react-router-dom";

const ClubNotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Club Not Found</h1>
      <Link to="/academic-club" className="text-blue-600 hover:text-blue-800">
        Back to student clubs
      </Link>
    </div>
  </div>
);

export default ClubNotFound;
