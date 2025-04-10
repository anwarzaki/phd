import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getScholarUsers,
  updateScholar,
  generateReport,
  downloadReport,
  getAllRACMembers,
  updatedRACMember,
} from "../services/api";
import Navbar from "../components/Navbar";
import EditScholarModal from "../components/EditScholarModal";
import EditRACModal from "../components/EditRACModal";
import Footer from "../components/Footer";

function CoordinatorDashboard() {
  // Scholars state
  const [scholars, setScholars] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedScholar, setSelectedScholar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  // RAC Members state
  const [racMembers, setRacMembers] = useState([]);
  const [racPage, setRacPage] = useState(0);
  const [racTotalPages, setRacTotalPages] = useState(0);
  const [racLoading, setRacLoading] = useState(false);
  const [selectedRacMember, setSelectedRacMember] = useState(null);
  const [racSearchTerm, setRacSearchTerm] = useState("");
  const [racSortConfig, setRacSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  // Tab state
  const [activeTab, setActiveTab] = useState("scholars");

  // Fetch scholars when the component mounts or page changes
  useEffect(() => {
    const fetchScholars = async () => {
      setLoading(true);
      try {
        const response = await getScholarUsers(page, size);
        setScholars(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } catch (error) {
        handleApiError(error, "Failed to load scholars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "scholars") {
      fetchScholars();
    }
  }, [page, size, activeTab]);

  // Fetch RAC members when the component mounts or racPage changes
  useEffect(() => {
    const fetchRacMembers = async () => {
      setRacLoading(true);
      try {
        const response = await getAllRACMembers(racPage, size);
        setRacMembers(response.data.content || []);
        setRacTotalPages(response.data.totalPages || 0);
      } catch (error) {
        handleApiError(error, "Failed to load RAC members. Please try again.");
      } finally {
        setRacLoading(false);
      }
    };

    if (activeTab === "rac") {
      fetchRacMembers();
    }
  }, [racPage, size, activeTab]);

  const handleApiError = (error, defaultMessage) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error(error.response?.data?.message || defaultMessage);
    }
    console.error("API Error:", error.response?.data || error.message);
  };

  // Handle edit scholar
  const handleEdit = (scholar) => {
    setSelectedScholar(scholar);
  };

  // Handle edit RAC member
  const handleEditRac = (racMember) => {
    setSelectedRacMember(racMember);
  };

  const handleSaveScholar = async (updatedScholar) => {
    try {
      await updateScholar(selectedScholar.id, updatedScholar);
      toast.success(
        `Scholar ${updatedScholar.scholarName} updated successfully!`
      );
      const response = await getScholarUsers(page, size);
      setScholars(response.data.content || []);
      setSelectedScholar(null);
    } catch (error) {
      handleApiError(error, "Failed to update scholar. Please try again.");
    }
  };

  const handleSaveRacMember = async (updatedRacMember) => {
    try {
      await updatedRACMember(selectedRacMember.id, updatedRacMember);
      toast.success(
        `RAC Member ${updatedRacMember.name} updated successfully!`
      );
      const response = await getAllRACMembers(racPage, size);
      setRacMembers(response.data.content || []);
      setSelectedRacMember(null);
    } catch (error) {
      handleApiError(error, "Failed to update RAC member. Please try again.");
    }
  };

  // Handle generate report
  const handleGenerateReport = async (scholarId) => {
    try {
      const response = await generateReport(scholarId);
      downloadFile(response.data, `report-${scholarId}.pdf`);
      toast.success("Report generated and downloaded successfully!");
    } catch (error) {
      handleApiError(error, "Failed to generate report. Please try again.");
    }
  };

  // Handle download report
  const handleDownloadReport = async (scholarId) => {
    try {
      const response = await downloadReport(scholarId);
      // downloadFile(response.data, `report-${scholarId}.pdf`);
      // toast.success("Report downloaded successfully!");
      // Create blob URL for the PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Open in new tab
      window.open(url, "_blank");
    } catch (error) {
      handleApiError(error, "Failed to download report. Please try again.");
    }
  };

  const downloadFile = (data, filename) => {
    const url = window.URL.createObjectURL(
      new Blob([data], { type: "application/pdf" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Handle pagination for scholars
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

  // Handle pagination for RAC members
  const handleNextRacPage = () => {
    if (racPage < racTotalPages - 1) {
      setRacPage(racPage + 1);
    }
  };

  const handlePrevRacPage = () => {
    if (racPage > 0) {
      setRacPage(racPage - 1);
    }
  };

  // Sorting functionality for scholars
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sorting functionality for RAC members
  const requestRacSort = (key) => {
    let direction = "ascending";
    if (racSortConfig.key === key && racSortConfig.direction === "ascending") {
      direction = "descending";
    }
    setRacSortConfig({ key, direction });
  };

  const sortedScholars = [...scholars].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const sortedRacMembers = [...racMembers].sort((a, b) => {
    if (a[racSortConfig.key] < b[racSortConfig.key]) {
      return racSortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[racSortConfig.key] > b[racSortConfig.key]) {
      return racSortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredScholars = sortedScholars.filter((scholar) => {
    return (
      scholar.id.toString().includes(searchTerm) ||
      (scholar.scholarName &&
        scholar.scholarName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (scholar.email &&
        scholar.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (scholar.rollNo && scholar.rollNo.toString().includes(searchTerm)) ||
      (scholar.batch && scholar.batch.toString().includes(searchTerm))
    );
  });

  const filteredRacMembers = sortedRacMembers.filter((member) => {
    return (
      member.id.toString().includes(racSearchTerm) ||
      (member.name &&
        member.name.toLowerCase().includes(racSearchTerm.toLowerCase())) ||
      (member.email &&
        member.email.toLowerCase().includes(racSearchTerm.toLowerCase())) ||
      (member.designation &&
        member.designation
          .toLowerCase()
          .includes(racSearchTerm.toLowerCase())) ||
      (member.department &&
        member.department.toLowerCase().includes(racSearchTerm.toLowerCase()))
    );
  });

  // Define LoadingScreen before using it
  const LoadingScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );

  if (loading && activeTab === "scholars") {
    return <LoadingScreen />;
  }

  if (racLoading && activeTab === "rac") {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto p-4 md:p-6 mt-10">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold">
            Coordinator Dashboard
          </h1>
          <p className="mt-2 text-blue-100">
            Manage PhD scholars, RAC members, and reports
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-4 py-2 text-sm font-medium mr-4 ${
                activeTab === "scholars"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("scholars")}
            >
              PhD Scholars
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "rac"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("rac")}
            >
              RAC Members
            </button>
          </div>
        </div>

        {/* Scholars Section */}
        {activeTab === "scholars" && (
          <div className="bg-white shadow-md rounded-b-lg p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">
                Scholar Management
              </h2>
              <div className="w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search scholars..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {scholars.length === 0 ? (
              <NoDataMessage message="No scholars available for management." />
            ) : (
              <>
                <ScholarTable
                  scholars={filteredScholars}
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                  handleEdit={handleEdit}
                  handleGenerateReport={handleGenerateReport}
                  handleDownloadReport={handleDownloadReport}
                />
                <PaginationControls
                  currentPage={page}
                  totalPages={totalPages}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  itemsCount={filteredScholars.length}
                  totalItems={scholars.length}
                  itemName="scholars"
                />
              </>
            )}
          </div>
        )}

        {/* RAC Members Section */}
        {activeTab === "rac" && (
          <div className="bg-white shadow-md rounded-b-lg p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">
                RAC Member Management
              </h2>
              <div className="w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search RAC members..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={racSearchTerm}
                  onChange={(e) => setRacSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {racMembers.length === 0 ? (
              <NoDataMessage message="No RAC members available for management." />
            ) : (
              <>
                <RacMemberTable
                  members={filteredRacMembers}
                  sortConfig={racSortConfig}
                  requestSort={requestRacSort}
                  handleEdit={handleEditRac}
                />
                <PaginationControls
                  currentPage={racPage}
                  totalPages={racTotalPages}
                  handlePrevPage={handlePrevRacPage}
                  handleNextPage={handleNextRacPage}
                  itemsCount={filteredRacMembers.length}
                  totalItems={racMembers.length}
                  itemName="RAC members"
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* Edit Scholar Modal */}
      {selectedScholar && (
        <EditScholarModal
          scholar={selectedScholar}
          onClose={() => setSelectedScholar(null)}
          onSave={handleSaveScholar}
        />
      )}

      {/* Edit RAC Member Modal */}
      {selectedRacMember && (
        <EditRACModal
          show={!!selectedRacMember}
          racMember={selectedRacMember}
          handleClose={() => setSelectedRacMember(null)}
          handleSave={handleSaveRacMember}
        />
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}

// Reusable components
const NoDataMessage = ({ message }) => (
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
    <p className="mt-2 text-gray-500">{message}</p>
  </div>
);

const PaginationControls = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  itemsCount,
  totalItems,
  itemName,
}) => (
  <>
    <div className="mt-4 text-sm text-gray-500">
      Showing {itemsCount} of {totalItems} {itemName}
    </div>
    {totalPages > 1 && (
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    )}
  </>
);

const ScholarTable = ({
  scholars,
  sortConfig,
  requestSort,
  handleEdit,
  handleGenerateReport,
  handleDownloadReport,
}) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <SortableHeader
            label="Scholar ID"
            sortKey="id"
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
          <SortableHeader
            label="Name"
            sortKey="scholarName"
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
          <SortableHeader
            label="Email"
            sortKey="email"
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
          <SortableHeader
            label="Roll No"
            sortKey="rollNo"
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
          <SortableHeader
            label="Batch"
            sortKey="batch"
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {scholars.map((scholar) => (
          <tr key={scholar.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {scholar.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {scholar.scholarName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {scholar.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {scholar.rollNo}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {scholar.batch}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleEdit(scholar)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleGenerateReport(scholar.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                >
                  Generate
                </button>
                <button
                  onClick={() => handleDownloadReport(scholar.id)}
                  className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                >
                  View Report
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RacMemberTable = ({ members, sortConfig, requestSort, handleEdit }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <SortableHeader
            label="ID"
            sortKey="id"
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
          <SortableHeader
            label="Name"
            sortKey="name"
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
          <SortableHeader
            label="Email"
            sortKey="email"
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
          <SortableHeader
            label="Designation"
            sortKey="designation"
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
          <SortableHeader
            label="Department"
            sortKey="department"
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {members.map((member) => (
          <tr key={member.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {member.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {member.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {member.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {member.designation}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {member.department}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                onClick={() => handleEdit(member)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SortableHeader = ({ label, sortKey, sortConfig, requestSort }) => (
  <th
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
    onClick={() => requestSort(sortKey)}
  >
    <div className="flex items-center">
      {label}
      {sortConfig.key === sortKey && (
        <span className="ml-1">
          {sortConfig.direction === "ascending" ? "↑" : "↓"}
        </span>
      )}
    </div>
  </th>
);

export default CoordinatorDashboard;
