import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getScholarUsers,
  updateScholar,
  generateReport,
  downloadReport,
} from "../services/api";
import Navbar from "../components/Navbar";
import EditScholarModal from "../components/EditScholarModal";

function CoordinatorDashboard() {
  const [scholars, setScholars] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedScholar, setSelectedScholar] = useState(null);

  // Fetch scholars when the component mounts or page changes
  useEffect(() => {
    const fetchScholars = async () => {
      setLoading(true);
      try {
        const response = await getScholarUsers(page, size);
        setScholars(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
        } else {
          toast.error(
            error.response?.data?.message ||
              "Failed to load scholars. Please try again."
          );
        }
        console.error(
          "Error fetching scholars:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchScholars();
  }, [page]);

  // Handle edit scholar
  const handleEdit = (scholar) => {
    setSelectedScholar(scholar);
  };

  const handleSaveScholar = async (updatedScholar) => {
    try {
      const response = await updateScholar(selectedScholar.id, updatedScholar);
      toast.success(
        `Scholar ${updatedScholar.scholarName} updated successfully!`
      );
      // Refresh the scholar list
      const scholarsResponse = await getScholarUsers(page, size);
      setScholars(scholarsResponse.data.content || []);
      setSelectedScholar(null);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to update scholar. Please try again."
        );
      }
      console.error(
        "Error updating scholar:",
        error.response?.data || error.message
      );
    }
  };

  // Handle generate report
  const handleGenerateReport = async (scholarId) => {
    try {
      const response = await generateReport(scholarId);
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report-${scholarId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Report generated and downloaded successfully!");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to generate report. Please try again."
        );
      }
      console.error(
        "Error generating report:",
        error.response?.data || error.message
      );
    }
  };

  // Handle download report
  const handleDownloadReport = async (scholarId) => {
    try {
      const response = await downloadReport(scholarId);
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report-${scholarId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Report downloaded successfully!");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to download report. Please try again."
        );
      }
      console.error(
        "Error downloading report:",
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
        <h1 className="text-3xl font-bold mb-6 text-center">
          Coordinator Dashboard
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Manage PhD scholars and generate their reports.
        </p>

        {loading ? (
          <p className="text-center text-gray-600">Loading scholars...</p>
        ) : scholars.length === 0 ? (
          <p className="text-center text-gray-600">No scholars found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Roll No</th>
                  <th className="py-3 px-6 text-left">Batch</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {scholars.map((scholar) => (
                  <tr
                    key={scholar.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6">{scholar.id}</td>
                    <td className="py-3 px-6">{scholar.scholarName}</td>
                    <td className="py-3 px-6">{scholar.email}</td>
                    <td className="py-3 px-6">{scholar.rollNo}</td>
                    <td className="py-3 px-6">{scholar.batch}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleEdit(scholar)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleGenerateReport(scholar.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600 transition"
                      >
                        Generate Report
                      </button>
                      <button
                        onClick={() => handleDownloadReport(scholar.id)}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                      >
                        Download Report
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

        {/* Edit Scholar Modal */}
        {selectedScholar && (
          <EditScholarModal
            scholar={selectedScholar}
            onClose={() => setSelectedScholar(null)}
            onSave={handleSaveScholar}
          />
        )}
      </div>
    </div>
  );
}

export default CoordinatorDashboard;
