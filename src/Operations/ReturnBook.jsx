import { useState } from "react";
import axios from "axios";

export default function ReturnBook() {
  const [borrowRecordId, setBorrowRecordId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleReturnBook = async (e) => {
    e.preventDefault();
    setSuccess(""); 
    setError("");
    try {
      const res = await axios.post("https://librarymanagementbackend-j2qd.onrender.com/api/auth/return-book", { borrowRecordId });
      if (res.data.success) {
        setSuccess("Book returned successfully!");
        setBorrowRecordId("");
      } else {
        setError(res.data.message || "Failed to return book");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Return Book</h2>
      {success && <p className="text-green-500 mb-2">{success}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleReturnBook} className="flex flex-col gap-2">
        <input 
          value={borrowRecordId} 
          onChange={(e) => setBorrowRecordId(e.target.value)} 
          placeholder="Borrow Record ID" 
          className="border p-2 rounded" 
          required
        />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Return Book</button>
      </form>
    </div>
  );
}
