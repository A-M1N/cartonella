import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./routes/routes.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/store/index.js";
import AuthProvider from "../src/providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ToastProvider from "../src/providers/ToastProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./styles/global.css";
import App from "./App.jsx";
import "flag-icons/css/flag-icons.min.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider />
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
