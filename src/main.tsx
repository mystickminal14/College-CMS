import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { EnquiryProvider } from "./context/EnquiryContext.tsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20,
      gcTime: 1000 * 60 * 5,
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: 1000 * 90,
      refetchIntervalInBackground: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(

    <><QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <EnquiryProvider>
        <App />
      </EnquiryProvider>
    </QueryClientProvider></>
);
