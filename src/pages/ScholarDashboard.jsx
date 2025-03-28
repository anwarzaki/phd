import Navbar from "../components/Navbar";

function ScholarDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Scholar Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome, Scholar! Here you can manage your PhD reports.
          </p>
          {/* Add more features for scholars here */}
        </div>
      </div>
    </div>
  );
}

export default ScholarDashboard;
