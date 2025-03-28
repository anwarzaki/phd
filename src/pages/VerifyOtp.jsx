import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp, resendOtp } from "../services/api";
import Navbar from "../components/Navbar";

function VerifyOtp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    otp: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.state?.email &&
      location.state?.password &&
      location.state?.role
    ) {
      setFormData((prev) => ({
        ...prev,
        email: location.state.email,
        password: location.state.password,
        role: location.state.role,
      }));
    } else {
      setMessage("Required data not provided. Please register again.");
      setTimeout(() => navigate("/register"), 2000);
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await verifyOtp(formData);
      setMessage("OTP verified successfully! You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(
        "OTP Verification Error:",
        error.response?.data || error.message
      );
      setMessage(
        error.response?.data?.message ||
          "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await resendOtp({ email: formData.email });
      setMessage("OTP resent successfully! Check your email.");
    } catch (error) {
      console.error("Resend OTP Error:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="role">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none"
                disabled
              >
                <option value="COORDINATOR">Coordinator</option>
                <option value="RAC_MEMBER">RAC Member</option>
                <option value="SCHOLAR">Scholar</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="otp">
                OTP
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
          <button
            onClick={handleResendOtp}
            className="w-full mt-4 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition"
            disabled={loading}
          >
            {loading ? "Resending..." : "Resend OTP"}
          </button>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("successful")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
