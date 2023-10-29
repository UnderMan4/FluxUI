import { usePeriodicUpdate } from "@/hooks/usePeriodicUpdate";
import { MainLayout } from "@/layouts/MainLayout";
import { Login } from "@/router/login";
import { Root } from "@/router/root";
import { AuthService } from "@/services";
import { useDataStore } from "@/stores/dataStore";
import axios from "axios";
import { useEffect } from "react";
import {
   Navigate,
   RouterProvider,
   createBrowserRouter,
} from "react-router-dom";

const App = () => {
   const { logIn, logOut, isLoggedIn } = useDataStore();

   const DEV = import.meta.env.DEV;

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

   usePeriodicUpdate();

   const router = createBrowserRouter([
      {
         element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
         children: [
            {
               path: "/",
               element: <Root />,
            },
         ],
      },
      {
         path: "/login",
         element: isLoggedIn ? <Navigate to="/" /> : <Login />,
      },
   ]);

   return <RouterProvider router={router} />;
};

export default App;
