import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Result from "../Pages/Results/Result/Result";

const router = createBrowserRouter([
   {
      path: '/',
      element: <Main />,
      errorElement: <p>Error 404</p>,
      children: [
         {
            path: '/',
            element: <Home />
         },
         {
            path: 'result',
            element: <Result />
         }

      ]

   }
]);

export default router;