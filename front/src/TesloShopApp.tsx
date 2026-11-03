import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { appRouter } from "./app.router";

const queryClient = new QueryClient();

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={appRouter} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
