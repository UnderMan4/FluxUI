import { MainLayout } from "@/layouts/MainLayout";
import { Root } from "@/router";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
   const router = createBrowserRouter([
      {
         element: <MainLayout />,
         children: [
            {
               path: "/",
               element: <Root />,
            },
         ],
      },
   ]);

   return <RouterProvider router={router} />;
};

export default App;
