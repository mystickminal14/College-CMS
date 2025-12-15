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
      {/* Add your footer here */}
      <footer className="bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          {/* Footer content */}
        </div>
      </footer>
    </div>
  );
}