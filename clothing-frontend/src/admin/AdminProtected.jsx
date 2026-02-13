import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtected() {
  const role = localStorage.getItem("role");

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
