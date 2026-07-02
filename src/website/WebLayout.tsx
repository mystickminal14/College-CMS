import { Outlet } from "react-router-dom";
import { NavBar } from "./pages/home/components/NavBar";
import { ScrollToTop } from "../Scrolltop";
import Footer from "./pages/home/components/Footer";
import NiaaChatbot from "./Chatbot";
import PopupDisplay from "./comp/PopupDisplay";

export function WebsiteLayout() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <NavBar />
      <main className="relative">
        <Outlet />
      </main>

      <Footer />

      <NiaaChatbot />
      <PopupDisplay />
    </div>
  );
}
