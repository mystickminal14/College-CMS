// components/layout/WebsiteLayout.tsx
import { Outlet } from "react-router-dom";
import { NavBar } from "./pages/home/components/NavBar";

export function WebsiteLayout() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main>
        <Outlet />
      </main>
      
    </div>
  );
}