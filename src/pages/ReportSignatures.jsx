import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

const ReportSignatures = () => {
  const { id } = useParams();
  const [signatures, setSignatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSignatures = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/api/signatures/report/${id}`);
        setSignatures(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          navigate("/login");
        } else if (error.response?.status === 403) {
          setError("You do not have permission to view this resource.");
          toast.error("You do not have permission to view this resource.");
        } else {
          setError(
            "Error fetching signatures: " +
              (error.response?.data?.message || error.message)
          );
          toast.error(
            "Error fetching signatures: " +
              (error.response?.data?.message || error.message)
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSignatures();
  }, [id, navigate]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Signatures for Report {id}</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {signatures.length === 0 ? (
          <p>No signatures available for this report.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Signature ID</th>
                  <th className="py-2 px-4 border-b">Signed By</th>
                  <th className="py-2 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {signatures.map((signature) => (
                  <tr key={signature.id}>
                    <td className="py-2 px-4 border-b">{signature.id}</td>
                    <td className="py-2 px-4 border-b">{signature.signedBy}</td>
                    <td className="py-2 px-4 border-b">{signature.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportSignatures;
