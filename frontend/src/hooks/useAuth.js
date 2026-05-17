import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const { user, token, isLoading, error } = useSelector((state) => state.auth);

  const isAuthenticated = !!token && !!user;

  const handleLogout = () => {
    dispatch(logout());
  };
  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    logout: handleLogout,
  };
}
