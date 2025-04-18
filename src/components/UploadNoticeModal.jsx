import { useState } from "react";
import { toast } from "react-toastify";

function UploadNoticeModal({ show, handleClose, handleUpload }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      toast.error("Please provide a file and title");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);

      await handleUpload(formData);
      setFile(null);
      setTitle("");
      setDescription("");
      handleClose();
      toast.success("Notice uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload notice. Please try again.");
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Upload Notice</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title*
            </label>
            <input
              id="title"
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="file">
              Notice File (PDF)*
            </label>
            <input
              id="file"
              type="file"
              accept=".pdf"
              className="w-full px-3 py-2 border rounded-lg"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={handleClose}
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadNoticeModal;
