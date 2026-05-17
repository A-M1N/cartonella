import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminProtectedRoute() {
  const { user, token, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <p>Checking admin access...</p>;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
