import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role; // Adjust based on your token's structure
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Determine the dashboard path based on the role
  const getDashboardPath = () => {
    switch (role) {
      case "SCHOLAR":
        return "/scholar-dashboard";
      case "COORDINATOR":
        return "/coordinator-dashboard";
      case "RAC_MEMBER":
        return "/rac-member-dashboard";
      case "ADMIN":
        return "/admin-dashboard";
      default:
        return "/login";
    }
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md sticky top-0 z-50 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          PhD Report System
        </Link>
        <div className="space-x-4">
          {token && role ? (
            <>
              <Link
                to={getDashboardPath()}
                className="text-white hover:text-blue-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-blue-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
