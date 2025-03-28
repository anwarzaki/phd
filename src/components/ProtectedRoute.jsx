import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login with a message
    localStorage.setItem("authMessage", "Please log in to access this page.");
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role.toUpperCase(); // Normalize role to uppercase

    // Check if the user's role is in the allowed roles
    if (!allowedRoles.includes(role)) {
      localStorage.setItem(
        "authMessage",
        "You do not have permission to access this page."
      );
      return <Navigate to="/" replace />;
    }

    return children; // Render the protected component
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.setItem("authMessage", "Invalid token. Please log in again.");
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
