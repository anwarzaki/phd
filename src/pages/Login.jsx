// import { useState, useEffect } from "react"; // Add useEffect
// import { useNavigate } from "react-router-dom";
// import { login } from "../services/api";
// import { jwtDecode } from "jwt-decode";
// import Navbar from "../components/Navbar";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "admin@example.com",
//     password: "password123",
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // Check for auth message on component mount
//   useEffect(() => {
//     const authMessage = localStorage.getItem("authMessage");
//     if (authMessage) {
//       setMessage(authMessage);
//       toast.info(authMessage);
//       localStorage.removeItem("authMessage"); // Clear the message after displaying
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login(formData);
//       const token = response.data.token; // Assuming the token is in response.data.token
//       localStorage.setItem("token", token); // Store the token in localStorage

//       // Decode the token to get the user's role
//       const decodedToken = jwtDecode(token);
//       const role = decodedToken.role.toUpperCase(); // Normalize role to uppercase
//       toast.success("Login successful! Redirecting...");

//       setMessage("Login successful! Redirecting...");

//       // Redirect to the appropriate dashboard based on the role
//       switch (role) {
//         case "SCHOLAR":
//           navigate("/scholar-dashboard");
//           break;
//         case "COORDINATOR":
//           navigate("/coordinator-dashboard");
//           break;
//         case "RAC_MEMBER":
//           navigate("/rac-member-dashboard");
//           break;
//         case "ADMIN":
//           navigate("/admin-dashboard");
//           break;
//         default:
//           setMessage("Invalid role. Please contact support.");
//           localStorage.removeItem("token");
//           return;
//       }
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message ||
//           "Login failed. Please check your credentials."
//       );
//       toast.error(
//         error.response?.data?.message ||
//           "Login failed. Please check your credentials."
//       );
//       console.error("Login Error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="flex items-center justify-center h-[calc(100vh-64px)]">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 mb-2" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
//             >
//               Login
//             </button>
//             <p className="text-sm ml-6 mt-3">
//               Don't have an account ?{" "}
//               <Link to="/register" className="text-blue-700">
//                 Register here
//               </Link>
//             </p>
//           </form>
//           {message && (
//             <p
//               className={`mt-4 text-center ${
//                 message.includes("successful")
//                   ? "text-green-500"
//                   : "text-red-500"
//               }`}
//             >
//               {message}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify"; // Import toast
// // import { login } from "../services/api";
// // import { jwtDecode } from "jwt-decode";
// // import Navbar from "../components/Navbar";

// // function Login() {
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //   });
// //   const navigate = useNavigate();

// //   // Check for auth message on component mount
// //   useEffect(() => {
// //     const authMessage = localStorage.getItem("authMessage");
// //     if (authMessage) {
// //       toast.info(authMessage);
// //       localStorage.removeItem("authMessage");
// //     }
// //   }, []);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await login(formData);
// //       const token = response.data.token;
// //       localStorage.setItem("token", token);

// //       const decodedToken = jwtDecode(token);
// //       const role = decodedToken.role.toUpperCase();

// //       toast.success("Login successful! Redirecting...");

// //       switch (role) {
// //         case "SCHOLAR":
// //           navigate("/scholar-dashboard");
// //           break;
// //         case "COORDINATOR":
// //           navigate("/coordinator-dashboard");
// //           break;
// //         case "RAC_MEMBER":
// //           navigate("/rac-member-dashboard");
// //           break;
// //         case "ADMIN":
// //           navigate("/admin-dashboard");
// //           break;
// //         default:
// //           toast.error("Invalid role. Please contact support.");
// //           localStorage.removeItem("token");
// //           return;
// //       }
// //     } catch (error) {
// //       toast.error(
// //         error.response?.data?.message ||
// //           "Login failed. Please check your credentials."
// //       );
// //       console.error("Login Error:", error.response?.data || error.message);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <Navbar />
// //       <div className="flex items-center justify-center h-[calc(100vh-64px)]">
// //         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
// //           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
// //           <form onSubmit={handleSubmit}>
// //             <div className="mb-4">
// //               <label className="block text-gray-700 mb-2" htmlFor="email">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 required
// //               />
// //             </div>
// //             <div className="mb-6">
// //               <label className="block text-gray-700 mb-2" htmlFor="password">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 required
// //               />
// //             </div>
// //             <button
// //               type="submit"
// //               className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
// //             >
// //               Login
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authMessage = localStorage.getItem("authMessage");
    if (authMessage) {
      toast.info(authMessage);
      localStorage.removeItem("authMessage");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await login(formData);
      const token = response.data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      const role = decodedToken.role.toUpperCase();

      toast.success("Login successful! Redirecting...");

      switch (role) {
        case "SCHOLAR":
          navigate("/scholar-dashboard");
          break;
        case "COORDINATOR":
          navigate("/coordinator-dashboard");
          break;
        case "RAC_MEMBER":
          navigate("/rac-member-dashboard");
          break;
        case "ADMIN":
          navigate("/admin-dashboard");
          break;
        default:
          toast.error("Invalid role. Please contact support.");
          localStorage.removeItem("token");
          break;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <motion.h2
              className="text-2xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome Back
            </motion.h2>
            <motion.p
              className="opacity-90"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Sign in to your research account
            </motion.p>
          </div>

          <motion.div
            className="p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <form onSubmit={handleSubmit}>
              <motion.div className="mb-4" variants={itemVariants}>
                <label
                  className="block text-gray-700 mb-2 font-medium"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </motion.div>

              <motion.div className="mb-6" variants={itemVariants}>
                <label
                  className="block text-gray-700 mb-2 font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 rounded-lg font-medium flex items-center justify-center gap-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Signing in...</span>
                  ) : (
                    <>
                      <span>Login</span>
                      <FiArrowRight />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            <motion.div className="mt-4 text-center" variants={itemVariants}>
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Register here
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
