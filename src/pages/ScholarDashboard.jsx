import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getApprovedReport } from "../services/api";

function ScholarDashboard() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getApprovedReport();
        setReport(res.data);
      } catch (err) {
        console.error("Error fetching approved report:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Scholar Dashboard
          </h1>
          <p className="text-gray-600 mb-4">
            Welcome, Scholar! Here you can see your PhD reports.
          </p>

          {loading ? (
            <p className="text-blue-500 text-center">
              Loading approved report...
            </p>
          ) : report ? (
            <div className="mt-4 p-4 bg-gray-50 rounded shadow-sm">
              <h2 className="text-lg font-semibold mb-2">
                Approved Report Details:
              </h2>
              <p>
                <strong>Status:</strong> {report.status}
              </p>
              <p>
                <strong>Scholar ID:</strong> {report.scholarId}
              </p>
              <p>
                <strong>Coordinator ID:</strong> {report.coordinatorId}
              </p>

              <a
                href={`${report.reportPath}`}
                className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Signed Report
              </a>
            </div>
          ) : (
            <p className="text-red-500 text-center">
              No approved report found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScholarDashboard;
