import { RouterProvider } from "react-router-dom";
import ContextApp from "./context/ContextApp";
import router from "./routes/routes";
import { Suspense } from "react";
import PageLoader from "./website/pages/home/components/Loader";

function App() {
  return (

    <ContextApp>
      <Suspense
        fallback={<PageLoader text="Loading page..." />}
      >
        <RouterProvider router={router} />
      </Suspense>
    </ContextApp>
  );
}

export default App;
