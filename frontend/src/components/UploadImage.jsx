import React, { useState } from "react";
import axios from "axios";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select an image");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/media/upload",
        formData
      );
      setResult(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error uploading image");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
      
      <h2 className="text-2xl font-semibold mb-4">
        📤 Upload Image
      </h2>

      <input
        type="file"
        className="mb-4 text-sm"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 py-2 rounded-lg font-semibold"
      >
        {loading ? "Processing..." : "Upload & Verify"}
      </button>

      {result && (
        <div className="mt-6 bg-black/40 p-4 rounded-lg text-sm">
          <p><strong>Hash:</strong> {result.hash}</p>
          <p>
            <strong>Result:</strong>{" "}
            <span className={result.result === "AI-Generated" ? "text-red-400" : "text-green-400"}>
              {result.result}
            </span>
          </p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
          <p className="break-all">
            <strong>Tx:</strong> {result.transactionHash}
          </p>
        </div>
      )}

    </div>
  );
}

export default UploadImage;
