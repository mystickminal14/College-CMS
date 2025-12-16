import { createBrowserRouter } from "react-router-dom";
import { websiteRoutes } from "./WebsiteRoutes";
import { adminRoutes } from "./AdminRoutes";

const router = createBrowserRouter([...websiteRoutes, ...adminRoutes]);

export default router;
