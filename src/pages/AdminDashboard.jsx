import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllUsers, approveUser, rejectUser } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  // Fetch users when the component mounts or page changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers(page, size);
        setUsers(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
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
  }, [page, size]);

  // Handle user approval
  const handleApprove = async (userId) => {
    try {
      await approveUser(userId);
      toast.success(`User ${userId} approved successfully!`);
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

  // Sorting functionality
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) => {
    return (
      user.id.toString().includes(searchTerm) ||
      (user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.role &&
        user.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.status &&
        user.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen ">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto p-4 md:p-6 mt-10">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-blue-100">
            Manage and approve user registrations
          </p>
        </div>

        <div className="bg-white shadow-md rounded-b-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">
              User Management
            </h2>
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {users.length === 0 ? (
            <div className="bg-gray-50 p-6 text-center rounded-lg">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <p className="mt-2 text-gray-500">
                No users available for management.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("id")}
                      >
                        <div className="flex items-center">
                          User ID
                          {sortConfig.key === "id" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("email")}
                      >
                        <div className="flex items-center">
                          Email
                          {sortConfig.key === "email" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("role")}
                      >
                        <div className="flex items-center">
                          Role
                          {sortConfig.key === "role" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("status")}
                      >
                        <div className="flex items-center">
                          Status
                          {sortConfig.key === "status" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === "APPROVED"
                                ? "bg-green-100 text-green-800"
                                : user.status === "REJECTED"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {user.status || "PENDING"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col sm:flex-row gap-2">
                            {user.status !== "APPROVED" && (
                              <button
                                onClick={() => handleApprove(user.id)}
                                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                              >
                                Approve
                              </button>
                            )}
                            {user.status !== "REJECTED" && (
                              <button
                                onClick={() => handleReject(user.id)}
                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                              >
                                Reject
                              </button>
                            )}
                            {user.status === "APPROVED" && (
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">
                                Approved
                              </span>
                            )}
                            {user.status === "REJECTED" && (
                              <span className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm">
                                Rejected
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </div>

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
            </>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminDashboard;
