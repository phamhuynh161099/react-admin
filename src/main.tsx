// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/scss/custom-scrollbar.scss"
// import App from "./App.tsx";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login.tsx";
import Layout from "./components/layout.tsx";
import DashboardPage from "./pages/Dashboard.tsx";
import Calculator from "./pages/Calculator.tsx";
import AdminAuthMiddleware from "./middlewares/adminAuth.ts";
import NoAuthMiddleware from "./middlewares/noAuth.ts";
import UserPage from "./pages/user/index.tsx";

const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: (
      <NoAuthMiddleware>
        <LoginPage />
      </NoAuthMiddleware>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminAuthMiddleware>
        <Layout />
      </AdminAuthMiddleware>
    ),
    children: [
      { path: "user-dashboard", element: <DashboardPage /> },
      { path: "user/list", element: <UserPage /> },
    ],
  },
  {
    path: "/calculator",
    element: <Calculator />,
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
);
