import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroSection from "./pages/student/HeroSection";
import Login from "./pages/Login";
import { ThemeProvider } from "@/components/ThemeProvider";
import MainLayout from "./layout/MainLayout";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            {/* Course  */}
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
        <RouterProvider router={appRouter} />
      </main>
    </ThemeProvider>
  );
}

export default App;
