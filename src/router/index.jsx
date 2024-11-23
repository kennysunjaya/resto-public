import { createBrowserRouter } from "react-router-dom";
import Home from "../views/HomePage";
import DetailPage from "../views/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <DetailPage />,
  },
]);

export default router;
