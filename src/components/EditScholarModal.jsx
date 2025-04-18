import { useState, useEffect } from "react";

function EditScholarModal({ scholar, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    userId: "",
    scholarName: "",
    fatherName: "",
    email: "",
    batch: "",
    rollNo: "",
    passingYear: "",
    headingDate: "",
    dateOfJoining: "",
    yearOfAdmission: "",
    enrollmentNo: "",
    profilePhotoUrl: "",
    coSupervisor: "",
    phdCoordinator: "",
    nationality: "",
    vivaDate: "",
    fellowship: false,
    fullTimeOrPartTime: "FULL_TIME",
    supervisor: "",
    hodNominee: "",
    supervisorNominee: "",
    researchTitle: "",
    status: "IN_PROGRESS",
    titleStatus: "APPROVED",
  });

  useEffect(() => {
    if (scholar) {
      setFormData({
        id: scholar.id || "",
        userId: scholar.userId || "",
        scholarName: scholar.scholarName || "",
        fatherName: scholar.fatherName || "",
        email: scholar.email || "",
        batch: scholar.batch || "",
        rollNo: scholar.rollNo || "",
        passingYear: scholar.passingYear || "",
        headingDate: scholar.headingDate || "",
        dateOfJoining: scholar.dateOfJoining || "",
        yearOfAdmission: scholar.yearOfAdmission || "",
        enrollmentNo: scholar.enrollmentNo || "",
        profilePhotoUrl: scholar.profilePhotoUrl || "",
        coSupervisor: scholar.coSupervisor || "",
        phdCoordinator: scholar.phdCoordinator || "",
        nationality: scholar.nationality || "",
        vivaDate: scholar.vivaDate || "",
        fellowship: scholar.fellowship || false,
        fullTimeOrPartTime: scholar.fullTimeOrPartTime || "FULL_TIME",
        supervisor: scholar.supervisor || "",
        hodNominee: scholar.hodNominee || "",
        supervisorNominee: scholar.supervisorNominee || "",
        researchTitle: scholar.researchTitle || "",
        status: scholar.status || "IN_PROGRESS",
        titleStatus: scholar.titleStatus || "APPROVED",
      });
    }
  }, [scholar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Scholar</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="scholarName">
                Scholar Name
              </label>
              <input
                type="text"
                name="scholarName"
                value={formData.scholarName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="fatherName">
                Father’s Name
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly
                className="w-full p-3 border rounded-lg cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="batch">
                Batch
              </label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="rollNo">
                Roll No
              </label>
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="passingYear">
                Passing Year
              </label>
              <input
                type="number"
                name="passingYear"
                value={formData.passingYear}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="headingDate">
                Heading Date
              </label>
              <input
                type="date"
                name="headingDate"
                value={formData.headingDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="dateOfJoining"
              >
                Date of Joining
              </label>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="yearOfAdmission"
              >
                Year of Admission
              </label>
              <input
                type="number"
                name="yearOfAdmission"
                value={formData.yearOfAdmission}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="enrollmentNo"
              >
                Enrollment No
              </label>
              <input
                type="text"
                name="enrollmentNo"
                value={formData.enrollmentNo}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="profilePhotoUrl"
              >
                Profile Photo URL
              </label>
              <input
                type="text"
                name="profilePhotoUrl"
                value={formData.profilePhotoUrl}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="coSupervisor"
              >
                Co-Supervisor
              </label>
              <input
                type="text"
                name="coSupervisor"
                value={formData.coSupervisor}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="phdCoordinator"
              >
                PhD Coordinator
              </label>
              <input
                type="text"
                name="phdCoordinator"
                value={formData.phdCoordinator}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="nationality">
                Nationality
              </label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="vivaDate">
                Viva Date
              </label>
              <input
                type="date"
                name="vivaDate"
                value={formData.vivaDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="fellowship">
                Fellowship
              </label>
              <input
                type="checkbox"
                name="fellowship"
                checked={formData.fellowship}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="fullTimeOrPartTime"
              >
                Full-Time/Part-Time
              </label>
              <select
                name="fullTimeOrPartTime"
                value={formData.fullTimeOrPartTime}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="FULL_TIME">Full-Time</option>
                <option value="PART_TIME">Part-Time</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="supervisor">
                Supervisor
              </label>
              <input
                type="text"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="hodNominee">
                HOD Nominee
              </label>
              <input
                type="text"
                name="hodNominee"
                value={formData.hodNominee}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="supervisorNominee"
              >
                Supervisor Nominee
              </label>
              <input
                type="text"
                name="supervisorNominee"
                value={formData.supervisorNominee}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="researchTitle"
              >
                Research Title
              </label>
              <input
                type="text"
                name="researchTitle"
                value={formData.researchTitle}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="status">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="DROPPED">Dropped</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="titleStatus">
                Title Status
              </label>
              <select
                name="titleStatus"
                value={formData.titleStatus}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="APPROVED">Approved</option>
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditScholarModal;
