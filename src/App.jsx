// // import { Routes, Route } from 'react-router-dom';
// // import Home from './pages/Home';
// // import RegisterUser from './pages/RegisterUser';
// // import VerifyOtp from './pages/VerifyOtp'; // Import the new page
// // import Login from './pages/Login';
// // import UserProfile from './pages/UserProfile';

// // function App() {
// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/register" element={<RegisterUser />} />
// //         <Route path="/verify-otp" element={<VerifyOtp />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/profile" element={<UserProfile />} />
// //       </Routes>
// //     </div>
// //   );
// // }

// // // export default App;
// // import { Routes, Route } from "react-router-dom";
// // import Home from "./pages/Home";
// // import RegisterUser from "./pages/RegisterUser";
// // import VerifyOtp from "./pages/VerifyOtp";
// // import Login from "./pages/Login";
// // import ScholarDashboard from "./pages/ScholarDashboard";
// // import CoordinatorDashboard from "./pages/CoordinatorDashboard";
// // import RacMemberDashboard from "./pages/RacMemberDashboard";
// // import AdminDashboard from "./pages/AdminDashboard";
// // import ProtectedRoute from "./components/ProtectedRoute";

// // function App() {
// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/register" element={<RegisterUser />} />
// //         <Route path="/verify-otp" element={<VerifyOtp />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route
// //           path="/scholar-dashboard"
// //           element={
// //             <ProtectedRoute allowedRoles={["SCHOLAR"]}>
// //               <ScholarDashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="/coordinator-dashboard"
// //           element={
// //             <ProtectedRoute allowedRoles={["COORDINATOR"]}>
// //               <CoordinatorDashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="/rac-member-dashboard"
// //           element={
// //             <ProtectedRoute allowedRoles={["RAC_MEMBER"]}>
// //               <RacMemberDashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //         <Route
// //           path="/admin-dashboard"
// //           element={
// //             <ProtectedRoute allowedRoles={["ADMIN"]}>
// //               <AdminDashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //       </Routes>
// //     </div>
// //   );
// // }

// // export default App;

// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify"; // Import ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
// import Home from "./pages/Home";
// import RegisterUser from "./pages/RegisterUser";
// import VerifyOtp from "./pages/VerifyOtp";
// import Login from "./pages/Login";
// import ScholarDashboard from "./pages/ScholarDashboard";
// import CoordinatorDashboard from "./pages/CoordinatorDashboard";
// import RacMemberDashboard from "./pages/RacMemberDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<RegisterUser />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/scholar-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["SCHOLAR"]}>
//               <ScholarDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/coordinator-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["COORDINATOR"]}>
//               <CoordinatorDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/rac-member-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["RAC_MEMBER"]}>
//               <RacMemberDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["ADMIN"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import ScholarDashboard from "./pages/ScholarDashboard";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import RacMemberDashboard from "./pages/RacMemberDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ReportSignatures from "./pages/ReportSignatures"; // Import the new component
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/scholar-dashboard"
          element={
            <ProtectedRoute allowedRoles={["SCHOLAR"]}>
              <ScholarDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coordinator-dashboard"
          element={
            <ProtectedRoute allowedRoles={["COORDINATOR"]}>
              <CoordinatorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rac-member-dashboard"
          element={
            <ProtectedRoute allowedRoles={["RAC_MEMBER"]}>
              <RacMemberDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-signatures/:id"
          element={
            <ProtectedRoute allowedRoles={["RAC_MEMBER"]}>
              <ReportSignatures />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="text-center mt-10">404 - Page Not Found</div>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
