// import { useState, useEffect } from "react";
// import { getAllUsers, approveUser, rejectUser } from "../services/api";
// import Navbar from "../components/Navbar";

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(0);
//   const [size] = useState(10); // Fixed size for now
//   const [totalPages, setTotalPages] = useState(0);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch users when the component mounts or page changes
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setMessage("");
//       try {
//         const response = await getAllUsers(page, size);
//         setUsers(response.data.content || []); // Assuming the response has a 'content' field for the user list
//         setTotalPages(response.data.totalPages || 0); // Assuming the response has a 'totalPages' field
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setMessage("Session expired. Please log in again.");
//         } else {
//           setMessage(
//             error.response?.data?.message ||
//               "Failed to load users. Please try again."
//           );
//         }
//         console.error(
//           "Error fetching users:",
//           error.response?.data || error.message
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [page]);

//   // Handle user approval
//   const handleApprove = async (userId) => {
//     setMessage("");
//     try {
//       await approveUser(userId);
//       setMessage(`User ${userId} approved successfully!`);
//       // Refresh the user list
//       const response = await getAllUsers(page, size);
//       setUsers(response.data.content || []);
//     } catch (error) {
//       if (error.response?.status === 401) {
//         setMessage("Session expired. Please log in again.");
//       } else {
//         setMessage(
//           error.response?.data?.message || `Failed to approve user ${userId}.`
//         );
//       }
//       console.error(
//         "Error approving user:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   // Handle user rejection
//   const handleReject = async (userId) => {
//     setMessage("");
//     try {
//       await rejectUser(userId);
//       setMessage(`User ${userId} rejected successfully!`);
//       // Refresh the user list
//       const response = await getAllUsers(page, size);
//       setUsers(response.data.content || []);
//     } catch (error) {
//       if (error.response?.status === 401) {
//         setMessage("Session expired. Please log in again.");
//       } else {
//         setMessage(
//           error.response?.data?.message || `Failed to reject user ${userId}.`
//         );
//       }
//       console.error(
//         "Error rejecting user:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   // Handle pagination
//   const handleNextPage = () => {
//     if (page < totalPages - 1) {
//       setPage(page + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (page > 0) {
//       setPage(page - 1);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
//         <p className="text-gray-600 mb-6 text-center">
//           Manage users: approve or reject user registrations.
//         </p>

//         {message && (
//           <p
//             className={`mb-4 text-center ${
//               message.includes("successfully")
//                 ? "text-green-500"
//                 : "text-red-500"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         {loading ? (
//           <p className="text-center text-gray-600">Loading users...</p>
//         ) : users.length === 0 ? (
//           <p className="text-center text-gray-600">No users found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow-md rounded-lg">
//               <thead>
//                 <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                   <th className="py-3 px-6 text-left">ID</th>
//                   <th className="py-3 px-6 text-left">Email</th>
//                   <th className="py-3 px-6 text-left">Role</th>
//                   <th className="py-3 px-6 text-left">Status</th>
//                   <th className="py-3 px-6 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-600 text-sm">
//                 {users.map((user) => (
//                   <tr
//                     key={user.id}
//                     className="border-b border-gray-200 hover:bg-gray-100"
//                   >
//                     <td className="py-3 px-6">{user.id}</td>
//                     <td className="py-3 px-6">{user.email}</td>
//                     <td className="py-3 px-6">{user.role}</td>
//                     <td className="py-3 px-6">{user.status || "Pending"}</td>
//                     <td className="py-3 px-6 text-center">
//                       <button
//                         onClick={() => handleApprove(user.id)}
//                         className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600 transition"
//                         disabled={user.status === "APPROVED"}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleReject(user.id)}
//                         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                         disabled={user.status === "REJECTED"}
//                       >
//                         Reject
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination Controls */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-6 space-x-4">
//             <button
//               onClick={handlePrevPage}
//               disabled={page === 0}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300"
//             >
//               Previous
//             </button>
//             <span className="text-gray-600">
//               Page {page + 1} of {totalPages}
//             </span>
//             <button
//               onClick={handleNextPage}
//               disabled={page === totalPages - 1}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import toast
import { getAllUsers, approveUser, rejectUser } from "../services/api";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10); // Fixed size for now
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch users when the component mounts or page changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers(page, size);
        setUsers(response.data.content || []); // Assuming the response has a 'content' field for the user list
        setTotalPages(response.data.totalPages || 0); // Assuming the response has a 'totalPages' field
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
        } else {
          toast.error(
            error.response?.data?.message ||
              "Failed to load users. Please try again."
          );
        }
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  // Handle user approval
  const handleApprove = async (userId) => {
    try {
      await approveUser(userId);
      toast.success(`User ${userId} approved successfully!`);
      // Refresh the user list
      const response = await getAllUsers(page, size);
      setUsers(response.data.content || []);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(
          error.response?.data?.message || `Failed to approve user ${userId}.`
        );
      }
      console.error(
        "Error approving user:",
        error.response?.data || error.message
      );
    }
  };

  // Handle user rejection
  const handleReject = async (userId) => {
    try {
      await rejectUser(userId);
      toast.success(`User ${userId} rejected successfully!`);
      // Refresh the user list
      const response = await getAllUsers(page, size);
      setUsers(response.data.content || []);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(
          error.response?.data?.message || `Failed to reject user ${userId}.`
        );
      }
      console.error(
        "Error rejecting user:",
        error.response?.data || error.message
      );
    }
  };

  // Handle pagination
  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6 text-center">
          Manage users: approve or reject user registrations.
        </p>

        {loading ? (
          <p className="text-center text-gray-600">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6">{user.id}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.role}</td>
                    <td className="py-3 px-6">{user.status || "Pending"}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600 transition"
                        disabled={user.status === "APPROVED"}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        disabled={user.status === "REJECTED"}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages - 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
