// // import React, { useState, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import {
// //   getReportsForApproval,
// //   approveReport,
// //   generateReport,
// //   downloadReport,
// //   downloadReportRAC,
// // } from "../services/api";
// // import Navbar from "../components/Navbar";

// // const RacMemberDashboard = () => {
// //   const [reports, setReports] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [sortConfig, setSortConfig] = useState({
// //     key: "id",
// //     direction: "ascending",
// //   });
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchReports = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await getReportsForApproval();
// //         setReports(response.data);
// //       } catch (error) {
// //         handleApiError(error, "Failed to load reports. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchReports();
// //   }, [navigate]);

// //   const handleApiError = (error, defaultMessage) => {
// //     console.error("API Error:", error);

// //     if (error.response?.status === 401) {
// //       toast.error("Session expired. Please log in again.");
// //       navigate("/login");
// //     } else if (error.response?.status === 403) {
// //       const errorMsg =
// //         error.response?.data?.message ||
// //         "You don't have permission to perform this action";
// //       toast.error(errorMsg);
// //       setError(errorMsg);
// //     } else {
// //       const errorMsg =
// //         error.response?.data?.message || error.message || defaultMessage;
// //       toast.error(errorMsg);
// //       setError(errorMsg);
// //     }
// //   };

// //   const handleApproveReport = async (reportId) => {
// //     try {
// //       await approveReport(reportId);
// //       toast.success(`Report ${reportId} approved successfully!`);
// //       // Refresh the reports list
// //       const response = await getReportsForApproval();
// //       setReports(response.data);
// //     } catch (error) {
// //       handleApiError(error, "Failed to approve report. Please try again.");
// //     }
// //   };

// //   const handleViewReport = async (scholarId) => {
// //     try {
// //       const response = await downloadReportRAC(scholarId);

// //       // Create blob URL for the PDF
// //       const blob = new Blob([response.data], { type: "application/pdf" });
// //       const url = window.URL.createObjectURL(blob);

// //       // Open in new tab
// //       window.open(url, "_blank");

// //       toast.success("Report generated successfully!");
// //     } catch (error) {
// //       handleApiError(error, "Failed to generate report. Please try again.");
// //     }
// //   };

// //   const requestSort = (key) => {
// //     let direction = "ascending";
// //     if (sortConfig.key === key && sortConfig.direction === "ascending") {
// //       direction = "descending";
// //     }
// //     setSortConfig({ key, direction });
// //   };

// //   const sortedReports = [...reports].sort((a, b) => {
// //     if (a[sortConfig.key] < b[sortConfig.key]) {
// //       return sortConfig.direction === "ascending" ? -1 : 1;
// //     }
// //     if (a[sortConfig.key] > b[sortConfig.key]) {
// //       return sortConfig.direction === "ascending" ? 1 : -1;
// //     }
// //     return 0;
// //   });

// //   const filteredReports = sortedReports.filter((report) => {
// //     const searchLower = searchTerm.toLowerCase();
// //     return (
// //       report.id.toString().includes(searchTerm) ||
// //       report.scholarName?.toLowerCase().includes(searchLower) ||
// //       report.batch?.toString().includes(searchTerm) ||
// //       report.reportStatus?.toLowerCase().includes(searchLower)
// //     );
// //   });

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <Navbar />
// //         <div className="flex items-center justify-center min-h-screen">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <Navbar />
// //         <div className="flex items-center justify-center min-h-screen">
// //           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-md">
// //             <p className="font-bold">Error</p>
// //             <p>{error}</p>
// //             <button
// //               onClick={() => window.location.reload()}
// //               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //             >
// //               Refresh Page
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Navbar />

// //       <div className="container mx-auto p-4 md:p-6">
// //         <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg shadow-md">
// //           <h1 className="text-2xl md:text-3xl font-bold">
// //             RAC Member Dashboard
// //           </h1>
// //           <p className="mt-2 text-blue-100">
// //             Manage and approve scholar reports
// //           </p>
// //         </div>

// //         <div className="bg-white shadow-md rounded-b-lg p-4 md:p-6 mb-6">
// //           <div className="flex flex-col md:flex-row justify-between items-center mb-6">
// //             <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">
// //               Reports for Approval
// //             </h2>
// //             <div className="w-full md:w-64">
// //               <input
// //                 type="text"
// //                 placeholder="Search reports..."
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //           </div>

// //           {reports.length === 0 ? (
// //             <div className="bg-gray-50 p-6 text-center rounded-lg">
// //               <svg
// //                 className="mx-auto h-12 w-12 text-gray-400"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
// //                 />
// //               </svg>
// //               <p className="mt-2 text-gray-500">
// //                 No reports available for approval.
// //               </p>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="overflow-x-auto bg-white rounded-lg shadow">
// //                 <table className="min-w-full divide-y divide-gray-200">
// //                   <thead className="bg-gray-50">
// //                     <tr>
// //                       <th
// //                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
// //                         onClick={() => requestSort("id")}
// //                       >
// //                         <div className="flex items-center">
// //                           Report ID
// //                           {sortConfig.key === "id" && (
// //                             <span className="ml-1">
// //                               {sortConfig.direction === "ascending" ? "↑" : "↓"}
// //                             </span>
// //                           )}
// //                         </div>
// //                       </th>
// //                       <th
// //                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
// //                         onClick={() => requestSort("scholarName")}
// //                       >
// //                         <div className="flex items-center">
// //                           Scholar Name
// //                           {sortConfig.key === "scholarName" && (
// //                             <span className="ml-1">
// //                               {sortConfig.direction === "ascending" ? "↑" : "↓"}
// //                             </span>
// //                           )}
// //                         </div>
// //                       </th>
// //                       <th
// //                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
// //                         onClick={() => requestSort("batch")}
// //                       >
// //                         <div className="flex items-center">
// //                           Batch
// //                           {sortConfig.key === "batch" && (
// //                             <span className="ml-1">
// //                               {sortConfig.direction === "ascending" ? "↑" : "↓"}
// //                             </span>
// //                           )}
// //                         </div>
// //                       </th>
// //                       <th
// //                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
// //                         onClick={() => requestSort("reportStatus")}
// //                       >
// //                         <div className="flex items-center">
// //                           Status
// //                           {sortConfig.key === "reportStatus" && (
// //                             <span className="ml-1">
// //                               {sortConfig.direction === "ascending" ? "↑" : "↓"}
// //                             </span>
// //                           )}
// //                         </div>
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                         Actions
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white divide-y divide-gray-200">
// //                     {filteredReports.map((report) => (
// //                       <tr key={report.id} className="hover:bg-gray-50">
// //                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
// //                           {report.id}
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                           {report.scholarName || `Scholar ${report.scholarId}`}
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
// //                           {report.batch}
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <span
// //                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                               report.reportStatus === "APPROVED"
// //                                 ? "bg-green-100 text-green-800"
// //                                 : report.reportStatus === "PENDING"
// //                                 ? "bg-yellow-100 text-yellow-800"
// //                                 : "bg-gray-100 text-gray-800"
// //                             }`}
// //                           >
// //                             {report.reportStatus}
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                           <div className="flex flex-col sm:flex-row gap-2">
// //                             <button
// //                               onClick={() => handleViewReport(report.scholarId)}
// //                               className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
// //                             >
// //                               View Report
// //                             </button>
// //                             <button
// //                               onClick={() => handleApproveReport(report.id)}
// //                               disabled={report.reportStatus === "APPROVED"}
// //                               className={`px-3 py-1 rounded text-sm ${
// //                                 report.reportStatus === "APPROVED"
// //                                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// //                                   : "bg-green-500 hover:bg-green-600 text-white"
// //                               }`}
// //                             >
// //                               {report.reportStatus === "APPROVED"
// //                                 ? "Approved"
// //                                 : "Approve"}
// //                             </button>
// //                             <Link
// //                               to={`/report-signatures/${report.id}`}
// //                               className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm text-center"
// //                             >
// //                               View Signatures
// //                             </Link>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //               <div className="mt-4 text-sm text-gray-500">
// //                 Showing {filteredReports.length} of {reports.length} reports
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RacMemberDashboard;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   getReportsForApproval,
//   approveReport,
//   downloadReportRAC,
//   uploadSignature,
// } from "../services/api";
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
//   const [showSignatureModal, setShowSignatureModal] = useState(false);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [signatureFile, setSignatureFile] = useState(null);
//   const [position, setPosition] = useState({ x: 100, y: 200 });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         setLoading(true);
//         const response = await getReportsForApproval();
//         setReports(response.data);
//       } catch (error) {
//         handleApiError(error, "Failed to load reports. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReports();
//   }, [navigate]);

//   const handleApiError = (error, defaultMessage) => {
//     console.error("API Error:", error);

//     if (error.response?.status === 401) {
//       toast.error("Session expired. Please log in again.");
//       navigate("/login");
//     } else if (error.response?.status === 403) {
//       const errorMsg =
//         error.response?.data?.message ||
//         "You don't have permission to perform this action";
//       toast.error(errorMsg);
//       setError(errorMsg);
//     } else {
//       const errorMsg =
//         error.response?.data?.message || error.message || defaultMessage;
//       toast.error(errorMsg);
//       setError(errorMsg);
//     }
//   };

//   const handleApproveReport = async (reportId) => {
//     try {
//       await approveReport(reportId);
//       toast.success(`Report ${reportId} approved successfully!`);
//       const response = await getReportsForApproval();
//       setReports(response.data);
//     } catch (error) {
//       handleApiError(error, "Failed to approve report. Please try again.");
//     }
//   };

//   const handleViewReport = async (scholarId) => {
//     try {
//       const response = await downloadReportRAC(scholarId);
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       window.open(url, "_blank");
//       toast.success("Report opened successfully!");
//     } catch (error) {
//       handleApiError(error, "Failed to open report. Please try again.");
//     }
//   };

//   const handleOpenSignatureModal = (report) => {
//     setSelectedReport(report);
//     setShowSignatureModal(true);
//   };

//   const handleSignatureUpload = async () => {
//     if (!signatureFile || !selectedReport) return;

//     try {
//       const formData = new FormData();
//       formData.append("file", signatureFile);
//       formData.append("x", position.x.toString());
//       formData.append("y", position.y.toString());

//       await uploadSignature(selectedReport.id, formData);
//       toast.success("Signature uploaded successfully!");
//       setShowSignatureModal(false);
//       setSignatureFile(null);
//     } catch (error) {
//       handleApiError(error, "Failed to upload signature. Please try again.");
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
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       report.id.toString().includes(searchTerm) ||
//       report.scholarName?.toLowerCase().includes(searchLower) ||
//       report.batch?.toString().includes(searchTerm) ||
//       report.reportStatus?.toLowerCase().includes(searchLower)
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
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-md">
//             <p className="font-bold">Error</p>
//             <p>{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Refresh Page
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

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
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
//                               onClick={() => handleViewReport(report.scholarId)}
//                               className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
//                             >
//                               View Report
//                             </button>
//                             <button
//                               onClick={() => handleApproveReport(report.id)}
//                               disabled={report.reportStatus === "APPROVED"}
//                               className={`px-3 py-1 rounded text-sm ${
//                                 report.reportStatus === "APPROVED"
//                                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                   : "bg-green-500 hover:bg-green-600 text-white"
//                               }`}
//                             >
//                               {report.reportStatus === "APPROVED"
//                                 ? "Approved"
//                                 : "Approve"}
//                             </button>
//                             <button
//                               onClick={() => handleOpenSignatureModal(report)}
//                               className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm"
//                             >
//                               Upload Sign
//                             </button>
//                             <Link
//                               to={`/report-signatures/${report.id}`}
//                               className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm text-center"
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

//       {/* Signature Upload Modal */}
//       {showSignatureModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-4">
//               Upload Signature for Report #{selectedReport?.id}
//             </h2>

//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Signature Image
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setSignatureFile(e.target.files[0])}
//                 className="w-full px-3 py-2 border rounded"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   X Position
//                 </label>
//                 <input
//                   type="number"
//                   value={position.x}
//                   onChange={(e) =>
//                     setPosition({
//                       ...position,
//                       x: parseInt(e.target.value) || 0,
//                     })
//                   }
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Y Position
//                 </label>
//                 <input
//                   type="number"
//                   value={position.y}
//                   onChange={(e) =>
//                     setPosition({
//                       ...position,
//                       y: parseInt(e.target.value) || 0,
//                     })
//                   }
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowSignatureModal(false)}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSignatureUpload}
//                 disabled={!signatureFile}
//                 className={`px-4 py-2 text-white rounded ${
//                   !signatureFile
//                     ? "bg-indigo-300"
//                     : "bg-indigo-600 hover:bg-indigo-700"
//                 }`}
//               >
//                 Upload Signature
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RacMemberDashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getReportsForApproval,
  approveReport,
  downloadReportRAC,
  viewSignature,
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
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [position, setPosition] = useState({ x: 100, y: 200 });
  const [showViewSignatureModal, setShowViewSignatureModal] = useState(false);
  const [currentSignature, setCurrentSignature] = useState(null);
  const navigate = useNavigate();

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYW5qaUBnbWFpbC5jb20iLCJyb2xlIjoiUkFDX01FTUJFUiIsImlkIjo2LCJpYXQiOjE3NDM4NzY3MTUsImV4cCI6MTc0Mzg4MDMxNX0.coAAT0hA74O9oq-ao2q_CyX4Ncgn2T3jqTkxhqF4QMk";

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
      const response = await getReportsForApproval();
      setReports(response.data);
    } catch (error) {
      handleApiError(error, "Failed to approve report. Please try again.");
    }
  };

  const handleViewReport = async (scholarId) => {
    try {
      const response = await downloadReportRAC(scholarId);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
      toast.success("Report opened successfully!");
    } catch (error) {
      handleApiError(error, "Failed to open report. Please try again.");
    }
  };

  const handleOpenSignatureModal = (report) => {
    setSelectedReport(report);
    setShowSignatureModal(true);
  };

  const handleViewSignature = async (reportId) => {
    try {
      const response = await viewSignature(reportId);
      setCurrentSignature(response.data);
      setSelectedReport(reports.find((r) => r.id === reportId));
      setShowViewSignatureModal(true);
    } catch (error) {
      handleApiError(error, "Failed to fetch signature. Please try again.");
    }
  };

  const handleSignatureUpload = async () => {
    if (!signatureFile || !selectedReport) return;

    try {
      const formData = new FormData();
      formData.append("file", signatureFile);
      formData.append("x", position.x.toString());
      formData.append("y", position.y.toString());

      const response = await fetch(
        "http://localhost:8080/api/rac-member/signature",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Signature upload failed");
      }

      toast.success("Signature uploaded successfully!");
      setShowSignatureModal(false);
      setSignatureFile(null);
      setPosition({ x: 100, y: 200 });
    } catch (error) {
      handleApiError(error, "Failed to upload signature. Please try again.");
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
      <div className="container mx-auto p-4 md:p-6 mt-10">
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
                            <button
                              onClick={() => handleOpenSignatureModal(report)}
                              className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm"
                            >
                              Upload Sign
                            </button>
                            <button
                              onClick={() => handleViewSignature(report.id)}
                              className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                            >
                              View Signature
                            </button>
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

      {/* Signature Upload Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Upload Signature for Report #{selectedReport?.id}
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Signature Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSignatureFile(e.target.files[0])}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  X Position
                </label>
                <input
                  type="number"
                  value={position.x}
                  onChange={(e) =>
                    setPosition({
                      ...position,
                      x: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Y Position
                </label>
                <input
                  type="number"
                  value={position.y}
                  onChange={(e) =>
                    setPosition({
                      ...position,
                      y: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowSignatureModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSignatureUpload}
                disabled={!signatureFile}
                className={`px-4 py-2 text-white rounded ${
                  !signatureFile
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Upload Signature
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signature View Modal */}
      {showViewSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">Signature Details</h2>
                <p className="text-sm text-gray-500">
                  Report ID: {selectedReport?.id || "N/A"} | Scholar:{" "}
                  {selectedReport?.scholarName || "N/A"}
                </p>
              </div>
              <button
                onClick={() => setShowViewSignatureModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="mb-4 p-4 border rounded-lg bg-gray-50">
              {currentSignature ? (
                <img
                  src={`data:image/png;base64,${currentSignature}`}
                  alt="Signature"
                  className="max-w-full h-auto"
                />
              ) : (
                <div className="text-center py-8">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <p className="mt-2 text-gray-500">
                    No signature available for this report
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowViewSignatureModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RacMemberDashboard;
