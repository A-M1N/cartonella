import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/slices/authSlice";

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { token, isLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only check auth if we have a token but no user yet
    if (token && !user) {
      dispatch(checkAuth());
    }
  }, [dispatch, token, user]);

  // Optional: Show loading while checking auth
  if (token && isLoading && !user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return children;
}

export default AuthProvider;
