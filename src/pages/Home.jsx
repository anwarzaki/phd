import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to PhD Report System
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your PhD reports efficiently and securely.
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
