import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser, FiLogOut, FiHome } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogout();
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
    navigate("/login");
    setIsMenuOpen(false);
  };

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

  const navLinks = [
    { name: "Home", path: "/", show: true },
    { name: "Dashboard", path: getDashboardPath(), show: !!token },
    { name: "Login", path: "/login", show: !token },
    { name: "Register", path: "/register", show: !token },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-blue-800 shadow-lg py-2" : "bg-blue-600 py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-white text-xl md:text-2xl font-bold flex items-center hover:text-blue-200 transition-colors"
          >
            <span className="hidden md:inline">RAC Report Gen</span>
            <span className="md:hidden">RAC</span>
            <span className="text-blue-200 ml-1">CS&IT MANUU</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(
              (link) =>
                link.show && (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={link.path}
                      className="text-white hover:text-blue-200 font-medium transition-colors flex items-center"
                    >
                      {link.name === "Dashboard" && <FiHome className="mr-1" />}
                      {link.name}
                    </Link>
                  </motion.div>
                )
            )}

            {token && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-blue-200 font-medium transition-colors flex items-center"
                >
                  <FiLogOut className="mr-1" />
                  Logout
                </button>
              </motion.div>
            )}

            {token && role && (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center bg-blue-700 px-3 py-1 rounded-full"
              >
                <FiUser className="text-white mr-2" />
                <span className="text-white text-sm font-medium capitalize">
                  {role.toLowerCase().replace("_", " ")}
                </span>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-3">
                {navLinks.map(
                  (link) =>
                    link.show && (
                      <motion.div
                        key={link.name}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Link
                          to={link.path}
                          className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    )
                )}

                {token && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-colors flex items-center"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </motion.div>
                )}

                {token && role && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center bg-blue-700 px-3 py-2 rounded-md mt-2"
                  >
                    <FiUser className="text-white mr-2" />
                    <span className="text-white text-sm font-medium capitalize">
                      {role.toLowerCase().replace("_", " ")}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
