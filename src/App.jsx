import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { FetchRq } from "./pages/FetchRq";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FetchIndv } from "./component/FetchInv";

export const App = () => {
  

  const queryClient = new QueryClient();

  const router = createBrowserRouter([
  {
    path: "/",
    element: <FetchRq />,
  },
  {
    path: "/rq/:id",
    element: <FetchIndv />,
  },
]);



  return (

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
         {/* <FetchRq /> */}
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  );
};