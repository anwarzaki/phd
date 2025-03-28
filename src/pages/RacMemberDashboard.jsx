import Navbar from '../components/Navbar';

function RacMemberDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">RAC Member Dashboard</h1>
          <p className="text-gray-600">Welcome, RAC Member! Here you can review PhD reports.</p>
          {/* Add more features for RAC members here */}
        </div>
      </div>
    </div>
  );
}

export default RacMemberDashboard;