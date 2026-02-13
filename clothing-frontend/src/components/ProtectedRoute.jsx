import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  if (!userId || role !== "USER") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
