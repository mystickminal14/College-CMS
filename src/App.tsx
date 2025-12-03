import { RouterProvider } from "react-router-dom";
import ContextApp from "./context/ContextApp";
import router from "./routes/routes";

function App() {
  return (
  
     <ContextApp> 
      <RouterProvider router={router} /> 
    </ContextApp>
  );
}

export default App;
