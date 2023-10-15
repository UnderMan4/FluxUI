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

   // window.document.__defineGetter__("referrer", function () {
   //    return "yoururl.com";
   // });

   const checkLogin = async () => {
      try {
         await AuthService.login("admin", "123456");
         logIn();
      } catch (error) {
         console.log("🚀 ~ file: App.tsx:27 ~ checkLogin ~ error:", error);
         logOut();
      }
   };

   useEffect(() => {
      axios.defaults.baseURL = DEV
         ? "http://localhost:8080/api/v2"
         : `${document.location.origin}/api/v2`;
      if (DEV) {
         // axios.defaults.headers.common.Origin = "http://localhost:8080";
         // axios.defaults.headers.common.Referer = "http://localhost:8080";
         // axios.defaults.headers.common.Host = "localhost:5173";
         axios.interceptors.request.use((config) => {
            console.log(
               "🚀 ~ file: App.tsx:39 ~ axios.interceptors.request.use ~ config:",
               config
            );
            config.headers.Origin = "http://localhost:8080";
            // config.headers.Referer = "http://localhost:8080";
            // config.headers.Host = "localhost:8080";
            return config;
         });
      }
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
