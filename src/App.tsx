import { Root } from "@/router";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
