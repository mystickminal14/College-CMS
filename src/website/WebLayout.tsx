// components/layout/WebsiteLayout.tsx
import { Outlet } from "react-router-dom";
import { NavBar } from "./pages/home/components/NavBar";
import { ScrollToTop } from "../Scrolltop";

export function WebsiteLayout() {
  return (
    <div className="min-h-screen bg-white">
            <ScrollToTop /> {/* Add this line */}

      <NavBar />
      <main>
        <Outlet />
      </main>
      
    </div>
  );
}