// import React, { useState, useEffect } from "react";

// const EditRACModal = ({ show, handleClose, racMember, handleSave }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     designation: "",
//     department: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     if (racMember) {
//       setFormData({
//         name: racMember.name || "",
//         role: racMember.role || "",
//         designation: racMember.designation || "",
//         department: racMember.department || "",
//         email: racMember.email || "",
//         phone: racMember.phone || "",
//       });
//     }
//   }, [racMember]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     handleSave(formData);
//     handleClose();
//   };

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Edit RAC Member</h2>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//             >
//               <option value="SUPERVISOR">Supervisor</option>
//               <option value="HOD_NOMINEE">HOD Nominee</option>
//               <option value="SUPERVISOR_NOMINEE">Supervisor Nominee</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Designation</label>
//             <input
//               type="text"
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Department</label>
//             <input
//               type="text"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Phone</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//             />
//           </div>
//         </div>
//         <div className="flex justify-end space-x-2 mt-4">
//           <button
//             onClick={handleClose}
//             className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditRACModal;

import React, { useState, useEffect } from "react";

const EditRACModal = ({ show, handleClose, racMember, handleSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    designation: "",
    department: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (racMember) {
      setFormData({
        name: racMember.name || "",
        role: racMember.role || "",
        designation: racMember.designation || "",
        department: racMember.department || "",
        email: racMember.email || "",
        phone: racMember.phone || "",
      });
    }
  }, [racMember]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Edit RAC Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Select Role</option>
                <option value="SUPERVISOR">Supervisor</option>
                <option value="HOD_NOMINEE">HOD Nominee</option>
                <option value="SUPERVISOR_NOMINEE">Supervisor Nominee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRACModal;
