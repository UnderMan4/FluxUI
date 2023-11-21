import { MainLayout } from "@/layouts/MainLayout";
import { List, Login, TorrentDetails } from "@/router";
import { AuthService } from "@/services";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { useEffect } from "react";
import { ContextMenu } from "./components/common/ContextMenu/ContextMenu";
import {
   Navigate,
   RouterProvider,
   createBrowserRouter,
} from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { startPeriodicUpdate, stopPeriodicUpdate } from "@/signals/appData";

const App = () => {
   const { logIn, logOut, isLoggedIn } = useAuthStore();

   const DEV = import.meta.env.DEV;

   const queryClient = new QueryClient();

   const checkLogin = async () => {
      try {
         const res = await AuthService.login({});
         if (res.data === "Fails.") {
            logOut();
            return;
         }
         logIn();
      } catch (error) {
         logOut();
      }
   };

   useEffect(() => {
      axios.defaults.baseURL = DEV
         ? "http://localhost:8080/api/v2"
         : `${document.location.origin}/api/v2`;
      checkLogin();
   }, []);

   useEffect(() => {
      if (!isLoggedIn) return stopPeriodicUpdate;
      startPeriodicUpdate();

      return stopPeriodicUpdate;
   }, [isLoggedIn]);

   const router = createBrowserRouter([
      {
         element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
         children: [
            {
               path: "/",
               element: <List />,
            },
            {
               path: "/{id}",
               element: <TorrentDetails />,
            },
         ],
      },
      {
         path: "/login",
         element: isLoggedIn ? <Navigate to="/" /> : <Login />,
      },
   ]);

   return (
      <QueryClientProvider client={queryClient}>
         <ContextMenu id="A" />
         <ContextMenu id="B" />
         <RouterProvider router={router} />
         {DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
   );
};

export default App;
