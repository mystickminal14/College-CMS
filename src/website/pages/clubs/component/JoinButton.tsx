import { FaArrowRight } from "react-icons/fa";

const JoinButton = ({ url }: { url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold whitespace-nowrap hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
  >
    Join Now <FaArrowRight className="text-xs" />
  </a>
);

export default JoinButton;
