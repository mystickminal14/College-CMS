import type { ReactNode } from "react";

// "Our Team" with the Join Now button on its side.
const TeamHeading = ({ children }: { children?: ReactNode }) => (
  <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
    <h3 className="text-2xl md:text-3xl font-bold text-blue-700">Our Team</h3>
    {children}
  </div>
);

export default TeamHeading;
