// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../services/api";
// import Navbar from "../components/Navbar"; // Ensure Navbar is imported
// import { Link } from "react-router-dom";

// function RegisterUser() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await registerUser(formData);
//       setMessage("Registration successful! Please verify your OTP.");
//       // Pass email, password, and role to the VerifyOtp page
//       navigate("/verify-otp", {
//         state: {
//           email: formData.email,
//           password: formData.password,
//           role: formData.role,
//         },
//       });
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message ||
//           "Registration failed. Please try again."
//       );
//       console.error(
//         "Registration Error:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="flex items-center justify-center h-[calc(100vh-64px)]">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
//             <div className="mb-4">
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
//             <div className="mb-6">
//               <label className="block text-gray-700 mb-2" htmlFor="role">
//                 Role
//               </label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="COORDINATOR">Coordinator</option>
//                 <option value="RAC_MEMBER">RAC Member</option>
//                 <option value="SCHOLAR">Scholar</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
//             >
//               Register
//             </button>
//             <p className="text-sm ml-6 mt-3">
//               Already have an account?{" "}
//               <Link to="/login" className="text-blue-700">
//                 Login here
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

// export default RegisterUser;

import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FiUser, FiLock, FiMail, FiArrowRight } from "react-icons/fi";

function RegisterUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "SCHOLAR",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await registerUser(formData);
      setMessage("Registration successful! Please verify your OTP.");
      navigate("/verify-otp", {
        state: {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
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
              Create Account
            </motion.h2>
            <motion.p
              className="opacity-90"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Join our research community
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

              <motion.div className="mb-4" variants={itemVariants}>
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

              <motion.div className="mb-6" variants={itemVariants}>
                <label
                  className="block text-gray-700 mb-2 font-medium"
                  htmlFor="role"
                >
                  Role
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    required
                  >
                    <option value="SCHOLAR">Research Scholar</option>
                    <option value="COORDINATOR">Coordinator</option>
                    <option value="RAC_MEMBER">RAC Member</option>
                  </select>
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
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <span>Register Now</span>
                      <FiArrowRight />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            <motion.div className="mt-4 text-center" variants={itemVariants}>
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Login here
                </Link>
              </p>
            </motion.div>

            {message && (
              <motion.div
                className={`mt-4 p-3 rounded-lg text-center ${
                  message.includes("successful")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default RegisterUser;
