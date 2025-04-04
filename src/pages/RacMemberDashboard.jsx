// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getReportsForApproval, approveReport } from "../services/api";
// import Navbar from "../components/Navbar";

// const RacMemberDashboard = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "id",
//     direction: "ascending",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         setLoading(true);
//         const response = await getReportsForApproval();
//         setReports(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           toast.error("Session expired. Please log in again.");
//           navigate("/login");
//         } else if (error.response?.status === 403) {
//           setError("You do not have permission to access this resource.");
//           toast.error("You do not have permission to access this resource.");
//         } else {
//           setError(
//             "Error fetching reports: " +
//               (error.response?.data?.message || error.message)
//           );
//           toast.error(
//             "Error fetching reports: " +
//               (error.response?.data?.message || error.message)
//           );
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReports();
//   }, [navigate]);

//   const handleApproveReport = async (reportId) => {
//     try {
//       await approveReport(reportId);
//       toast.success(`Report ${reportId} approved successfully!`);
//       const response = await getReportsForApproval();
//       setReports(response.data);
//     } catch (error) {
//       if (error.response?.status === 401) {
//         toast.error("Session expired. Please log in again.");
//         navigate("/login");
//       } else if (error.response?.status === 403) {
//         toast.error("You do not have permission to approve this report.");
//         console.error(
//           "403 Error Details:",
//           error.response?.data || error.message
//         );
//       } else {
//         toast.error(
//           "Error approving report: " +
//             (error.response?.data?.message || error.message)
//         );
//         console.error("Error Details:", error.response?.data || error.message);
//       }
//     }
//   };

//   // Function to handle opening the report
//   const handleOpenReport = (reportPath) => {
//     try {
//       // Convert the Windows path to a format that can be used in the browser
//       const filePath = reportPath.replace(/\\/g, "/");

//       // Create a temporary link element
//       const link = document.createElement("a");
//       link.href = `file:///${filePath}`;
//       link.target = "_blank";
//       link.rel = "noopener noreferrer";

//       // Programmatically click the link to open the file
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (err) {
//       toast.error(`Failed to open report: ${err.message}`);
//       console.error("Error opening report:", err);
//     }
//   };

//   const requestSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedReports = [...reports].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === "ascending" ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === "ascending" ? 1 : -1;
//     }
//     return 0;
//   });

//   const filteredReports = sortedReports.filter((report) => {
//     return (
//       report.id.toString().includes(searchTerm) ||
//       (report.scholarName &&
//         report.scholarName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (report.batch && report.batch.toString().includes(searchTerm)) ||
//       (report.reportStatus &&
//         report.reportStatus.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
//             <p className="font-bold">Error</p>
//             <p>{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       {/* Main Content */}
//       <div className="container mx-auto p-4 md:p-6">
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg shadow-md">
//           <h1 className="text-2xl md:text-3xl font-bold">
//             RAC Member Dashboard
//           </h1>
//           <p className="mt-2 text-blue-100">
//             Manage and approve scholar reports
//           </p>
//         </div>

//         <div className="bg-white shadow-md rounded-b-lg p-4 md:p-6 mb-6">
//           <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//             <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">
//               Reports for Approval
//             </h2>
//             <div className="w-full md:w-64">
//               <input
//                 type="text"
//                 placeholder="Search reports..."
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           {reports.length === 0 ? (
//             <div className="bg-gray-50 p-6 text-center rounded-lg">
//               <svg
//                 className="mx-auto h-12 w-12 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <p className="mt-2 text-gray-500">
//                 No reports available for approval.
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto bg-white rounded-lg shadow">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                         onClick={() => requestSort("id")}
//                       >
//                         <div className="flex items-center">
//                           Report ID
//                           {sortConfig.key === "id" && (
//                             <span className="ml-1">
//                               {sortConfig.direction === "ascending" ? "↑" : "↓"}
//                             </span>
//                           )}
//                         </div>
//                       </th>
//                       <th
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                         onClick={() => requestSort("scholarName")}
//                       >
//                         <div className="flex items-center">
//                           Scholar Name
//                           {sortConfig.key === "scholarName" && (
//                             <span className="ml-1">
//                               {sortConfig.direction === "ascending" ? "↑" : "↓"}
//                             </span>
//                           )}
//                         </div>
//                       </th>
//                       <th
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
//                         onClick={() => requestSort("batch")}
//                       >
//                         <div className="flex items-center">
//                           Batch
//                           {sortConfig.key === "batch" && (
//                             <span className="ml-1">
//                               {sortConfig.direction === "ascending" ? "↑" : "↓"}
//                             </span>
//                           )}
//                         </div>
//                       </th>
//                       <th
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                         onClick={() => requestSort("reportStatus")}
//                       >
//                         <div className="flex items-center">
//                           Status
//                           {sortConfig.key === "reportStatus" && (
//                             <span className="ml-1">
//                               {sortConfig.direction === "ascending" ? "↑" : "↓"}
//                             </span>
//                           )}
//                         </div>
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredReports.map((report) => (
//                       <tr key={report.id} className="hover:bg-gray-50">
//                         <td
//                           className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
//                           onClick={() => handleOpenReport(report.reportPath)}
//                         >
//                           {report.id}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {report.scholarName || `Scholar ${report.scholarId}`}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
//                           {report.batch}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               report.reportStatus === "APPROVED"
//                                 ? "bg-green-100 text-green-800"
//                                 : report.reportStatus === "PENDING"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-gray-100 text-gray-800"
//                             }`}
//                           >
//                             {report.reportStatus}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <div className="flex flex-col sm:flex-row gap-2">
//                             <button
//                               onClick={() => handleApproveReport(report.id)}
//                               disabled={report.status === "APPROVED"}
//                               className={`px-3 py-1 rounded text-sm ${
//                                 report.status === "APPROVED"
//                                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                   : "bg-green-500 hover:bg-green-600 text-white"
//                               }`}
//                             >
//                               {report.status === "APPROVED"
//                                 ? "Approved"
//                                 : "Approve"}
//                             </button>
//                             <Link
//                               to={`/report-signatures/${report.id}`}
//                               className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm text-center"
//                             >
//                               View Signatures
//                             </Link>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="mt-4 text-sm text-gray-500">
//                 Showing {filteredReports.length} of {reports.length} reports
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RacMemberDashboard;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getReportsForApproval,
  approveReport,
  generateReport,
  downloadReport,
  downloadReportRAC,
} from "../services/api";
import Navbar from "../components/Navbar";

const RacMemberDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await getReportsForApproval();
        setReports(response.data);
      } catch (error) {
        handleApiError(error, "Failed to load reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [navigate]);

  const handleApiError = (error, defaultMessage) => {
    console.error("API Error:", error);

    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      navigate("/login");
    } else if (error.response?.status === 403) {
      const errorMsg =
        error.response?.data?.message ||
        "You don't have permission to perform this action";
      toast.error(errorMsg);
      setError(errorMsg);
    } else {
      const errorMsg =
        error.response?.data?.message || error.message || defaultMessage;
      toast.error(errorMsg);
      setError(errorMsg);
    }
  };

  const handleApproveReport = async (reportId) => {
    try {
      await approveReport(reportId);
      toast.success(`Report ${reportId} approved successfully!`);
      // Refresh the reports list
      const response = await getReportsForApproval();
      setReports(response.data);
    } catch (error) {
      handleApiError(error, "Failed to approve report. Please try again.");
    }
  };

  const handleViewReport = async (scholarId) => {
    try {
      const response = await downloadReportRAC(scholarId);

      // Create blob URL for the PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Open in new tab
      window.open(url, "_blank");

      toast.success("Report generated successfully!");
    } catch (error) {
      handleApiError(error, "Failed to generate report. Please try again.");
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedReports = [...reports].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredReports = sortedReports.filter((report) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      report.id.toString().includes(searchTerm) ||
      report.scholarName?.toLowerCase().includes(searchLower) ||
      report.batch?.toString().includes(searchTerm) ||
      report.reportStatus?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-md">
            <p className="font-bold">Error</p>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto p-4 md:p-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold">
            RAC Member Dashboard
          </h1>
          <p className="mt-2 text-blue-100">
            Manage and approve scholar reports
          </p>
        </div>

        <div className="bg-white shadow-md rounded-b-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">
              Reports for Approval
            </h2>
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {reports.length === 0 ? (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-gray-500">
                No reports available for approval.
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
                          Report ID
                          {sortConfig.key === "id" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("scholarName")}
                      >
                        <div className="flex items-center">
                          Scholar Name
                          {sortConfig.key === "scholarName" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
                        onClick={() => requestSort("batch")}
                      >
                        <div className="flex items-center">
                          Batch
                          {sortConfig.key === "batch" && (
                            <span className="ml-1">
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("reportStatus")}
                      >
                        <div className="flex items-center">
                          Status
                          {sortConfig.key === "reportStatus" && (
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
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {report.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.scholarName || `Scholar ${report.scholarId}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          {report.batch}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              report.reportStatus === "APPROVED"
                                ? "bg-green-100 text-green-800"
                                : report.reportStatus === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {report.reportStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <button
                              onClick={() => handleViewReport(report.scholarId)}
                              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                            >
                              View Report
                            </button>
                            <button
                              onClick={() => handleApproveReport(report.id)}
                              disabled={report.reportStatus === "APPROVED"}
                              className={`px-3 py-1 rounded text-sm ${
                                report.reportStatus === "APPROVED"
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-green-500 hover:bg-green-600 text-white"
                              }`}
                            >
                              {report.reportStatus === "APPROVED"
                                ? "Approved"
                                : "Approve"}
                            </button>
                            <Link
                              to={`/report-signatures/${report.id}`}
                              className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm text-center"
                            >
                              View Signatures
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Showing {filteredReports.length} of {reports.length} reports
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RacMemberDashboard;
