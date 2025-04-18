// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { getApprovedReport, viewSignedReport } from "../services/api";

// function ScholarDashboard() {
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [downloading, setDownloading] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const res = await getApprovedReport();
//         setReport(res.data);
//       } catch (err) {
//         console.error("Error fetching approved report:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, []);

//   const handleViewSignedReport = async (reportId) => {
//     try {
//       const res = await viewSignedReport(reportId);
//       console.log(reportId);
//       const file = new Blob([res.data], { type: "application/pdf" });
//       const fileURL = URL.createObjectURL(file);
//       window.open(fileURL);
//     } catch (err) {
//       console.error("Error viewing signed report:", err);
//       alert("Failed to open signed report.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="flex items-center justify-center h-[calc(100vh-64px)]">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h1 className="text-2xl font-bold mb-6 text-center">
//             Scholar Dashboard
//           </h1>
//           <p className="text-gray-600 mb-4">
//             Welcome, Scholar! Here you can see your PhD reports.
//           </p>

//           {loading ? (
//             <p className="text-blue-500 text-center">
//               Loading approved report...
//             </p>
//           ) : report ? (
//             <div className="mt-4 p-4 bg-gray-50 rounded shadow-sm">
//               <h2 className="text-lg font-semibold mb-2">
//                 Approved Report Details:
//               </h2>
//               <p>
//                 <strong>Status:</strong> {report.status}
//               </p>
//               <p>
//                 <strong>Scholar ID:</strong> {report.scholarId}
//               </p>
//               <p>
//                 <strong>Coordinator ID:</strong> {report.coordinatorId}
//               </p>

//               <button
//                 onClick={() => handleViewSignedReport(report.scholarId)}
//                 className="inline-block mt-3 ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 disabled={downloading}
//               >
//                 {downloading ? "Opening..." : "View Signed Report"}
//               </button>
//             </div>
//           ) : (
//             <p className="text-red-500 text-center">
//               No approved report found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ScholarDashboard;
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getApprovedReport,
  viewSignedReport,
  getAllNotices,
  downloadNotice,
} from "../services/api";

function ScholarDashboard() {
  const [report, setReport] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState({
    report: true,
    notices: true,
  });
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState({
    report: false,
    notice: null,
  });
  const [activeTab, setActiveTab] = useState("report");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch report and notices in parallel
        const [reportRes, noticesRes] = await Promise.all([
          getApprovedReport(),
          getAllNotices(),
        ]);

        setReport(reportRes.data);
        setNotices(noticesRes.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading({ report: false, notices: false });
      }
    };

    fetchData();
  }, []);

  const handleViewSignedReport = async (reportId) => {
    if (!reportId) return;

    setDownloading({ ...downloading, report: true });
    try {
      const res = await viewSignedReport(reportId);
      const file = new Blob([res.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (err) {
      console.error("Error viewing signed report:", err);
      toast.error("Failed to open signed report. It may not be available yet.");
    } finally {
      setDownloading({ ...downloading, report: false });
    }
  };

  // const handleDownloadNotice = async (noticeId) => {
  //   setDownloading({...downloading, notice: noticeId});
  //   try {
  //     const res = await downloadNotice(noticeId);
  //     const file = new Blob([res.data], { type: "application/pdf" });
  //     const fileURL = URL.createObjectURL(file);

  //     // Create a temporary anchor element to trigger download
  //     const link = document.createElement('a');
  //     link.href = fileURL;
  //     link.setAttribute('download', `notice_${noticeId}.pdf`);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (err) {
  //     console.error("Error downloading notice:", err);
  //     toast.error("Failed to download notice. Please try again.");
  //   } finally {
  //     setDownloading({...downloading, notice: null});
  //   }
  // };

  const handleDownloadNotice = async (noticeId) => {
    setDownloading({ ...downloading, notice: noticeId });
    try {
      const res = await downloadNotice(noticeId);

      // Create blob URL for the PDF
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = url;

      // Extract filename from content-disposition header or use default
      const contentDisposition = res.headers["content-disposition"];
      let filename = `notice_${noticeId}.pdf`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Notice downloaded successfully!");
    } catch (err) {
      console.error("Error downloading notice:", err);
      toast.error("Failed to download notice. Please try again.");
    } finally {
      setDownloading({ ...downloading, notice: null });
    }
  };

  const LoadingScreen = () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto p-4 md:p-6 mt-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold">Scholar Dashboard</h1>
          <p className="mt-2 text-blue-100">
            View your approved reports and important notices
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-4 py-2 text-sm font-medium mr-4 ${
                activeTab === "report"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("report")}
            >
              My Report
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "notices"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("notices")}
            >
              Notices
            </button>
          </div>
        </div>

        {/* Report Section */}
        {activeTab === "report" && (
          <div className="bg-white shadow-md rounded-b-lg p-4 md:p-6 mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Approved Report
            </h2>

            {loading.report ? (
              <LoadingScreen />
            ) : report ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="text-lg font-semibold capitalize">
                      {report.status.toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Scholar ID
                    </p>
                    <p className="text-lg font-semibold">{report.scholarId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Coordinator ID
                    </p>
                    <p className="text-lg font-semibold">
                      {report.coordinatorId}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleViewSignedReport(report.scholarId)}
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                  disabled={downloading.report}
                >
                  {downloading.report ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Opening...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View Signed Report
                    </>
                  )}
                </button>
              </div>
            ) : (
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
                <p className="mt-2 text-gray-500">No approved report found.</p>
              </div>
            )}
          </div>
        )}

        {/* Notices Section */}
        {activeTab === "notices" && (
          <div className="bg-white shadow-md rounded-b-lg p-4 md:p-6 mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-6">Notices</h2>

            {loading.notices ? (
              <LoadingScreen />
            ) : notices.length > 0 ? (
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">
                            {notice.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {notice.description}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {notice.role}
                        </span>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          Posted by ID: {notice.uploadedById}
                        </p>
                        <button
                          onClick={() => handleDownloadNotice(notice.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          disabled={downloading.notice === notice.id}
                        >
                          {downloading.notice === notice.id ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Downloading
                            </>
                          ) : (
                            <>
                              <svg
                                className="-ml-1 mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Download
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="mt-2 text-gray-500">No notices available.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ScholarDashboard;
