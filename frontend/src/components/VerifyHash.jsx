import React, { useState } from "react";
import axios from "axios";

function VerifyHash() {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    if (!hash) return alert("Enter hash");

    try {
      const res = await axios.get(
        `https://finalyearproject-10.onrender.com/api/media/verify/${hash}`
      );
      setResult(res.data);
    } catch (error) {
      alert("Hash not found");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
      
      <h2 className="text-2xl font-semibold mb-4">
        🔍 Verify by Hash
      </h2>

      <input
        type="text"
        placeholder="Enter media hash"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        className="w-full p-2 rounded-lg text-black mb-4"
      />

      <button
        onClick={handleVerify}
        className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-2 rounded-lg font-semibold"
      >
        Verify
      </button>

      {result && (
        <div className="mt-6 bg-black/40 p-4 rounded-lg text-sm">
          <p>
            <strong>Result:</strong>{" "}
            <span className={result.result === "AI-Generated" ? "text-red-400" : "text-green-400"}>
              {result.result}
            </span>
          </p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
          <p className="break-all"><strong>Uploader:</strong> {result.uploader}</p>
          <p><strong>Time:</strong> {new Date(result.timestamp * 1000).toLocaleString()}</p>
        </div>
      )}

    </div>
  );
}

export default VerifyHash;
