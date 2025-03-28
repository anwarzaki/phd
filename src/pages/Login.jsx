// // import { useState } from "react";
// // import { login } from "../services/api"; // This should now work
// // import { useNavigate } from "react-router-dom";

// // function Login() {
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //   });
// //   const [message, setMessage] = useState("");
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await login(formData);
// //       setMessage("Login successful!");
// //       // Store token or user data if needed (e.g., in localStorage)
// //       localStorage.setItem("token", response.data.token); // Adjust based on your backend response
// //       navigate("/profile");
// //     } catch (error) {
// //       setMessage("Login failed. Please check your credentials.");
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
// //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
// //         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-4">
// //             <label className="block text-gray-700 mb-2" htmlFor="email">
// //               Email
// //             </label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>
// //           <div className="mb-6">
// //             <label className="block text-gray-700 mb-2" htmlFor="password">
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
// //           >
// //             Login
// //           </button>
// //         </form>
// //         {message && <p className="mt-4 text-center text-red-500">{message}</p>}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { login } from "../services/api";
// // import { jwtDecode } from "jwt-decode"; // Import jwt-decode
// // import Navbar from "../components/Navbar";

// // function Login() {
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //   });
// //   const [message, setMessage] = useState("");
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await login(formData);
// //       const token = response.data.token; // Assuming the token is in response.data.token
// //       localStorage.setItem("token", token); // Store the token in localStorage

// //       // Decode the token to get the user's role
// //       const decodedToken = jwtDecode(token);
// //       const role = decodedToken.role; // Adjust this based on your token's structure

// //       setMessage("Login successful! Redirecting...");

// //       // Redirect to the appropriate dashboard based on the role
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
// //           setMessage("Invalid role. Please contact support.");
// //           localStorage.removeItem("token");
// //           return;
// //       }
// //     } catch (error) {
// //       setMessage(
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
// //           {message && (
// //             <p
// //               className={`mt-4 text-center ${
// //                 message.includes("successful")
// //                   ? "text-green-500"
// //                   : "text-red-500"
// //               }`}
// //             >
// //               {message}
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

import { useState, useEffect } from "react"; // Add useEffect
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Check for auth message on component mount
  useEffect(() => {
    const authMessage = localStorage.getItem("authMessage");
    if (authMessage) {
      setMessage(authMessage);
      toast.info(authMessage);
      localStorage.removeItem("authMessage"); // Clear the message after displaying
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      const token = response.data.token; // Assuming the token is in response.data.token
      localStorage.setItem("token", token); // Store the token in localStorage

      // Decode the token to get the user's role
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role.toUpperCase(); // Normalize role to uppercase
      toast.success("Login successful! Redirecting...");

      setMessage("Login successful! Redirecting...");

      // Redirect to the appropriate dashboard based on the role
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
          setMessage("Invalid role. Please contact support.");
          localStorage.removeItem("token");
          return;
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      console.error("Login Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("successful")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; // Import toast
// import { login } from "../services/api";
// import { jwtDecode } from "jwt-decode";
// import Navbar from "../components/Navbar";

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   // Check for auth message on component mount
//   useEffect(() => {
//     const authMessage = localStorage.getItem("authMessage");
//     if (authMessage) {
//       toast.info(authMessage);
//       localStorage.removeItem("authMessage");
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login(formData);
//       const token = response.data.token;
//       localStorage.setItem("token", token);

//       const decodedToken = jwtDecode(token);
//       const role = decodedToken.role.toUpperCase();

//       toast.success("Login successful! Redirecting...");

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
//           toast.error("Invalid role. Please contact support.");
//           localStorage.removeItem("token");
//           return;
//       }
//     } catch (error) {
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
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
