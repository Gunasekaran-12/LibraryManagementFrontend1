import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check if user is logged in (string "true" in localStorage)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
