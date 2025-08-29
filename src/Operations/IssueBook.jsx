import { useState } from "react";
import axios from "axios";

export default function IssueBook() {
  const [bookId, setBookId] = useState("");
  const [borrowerId, setBorrowerId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleIssueBook = async (e) => {
    e.preventDefault();
    setSuccess(""); 
    setError("");
    try {
      const res = await axios.post("https://librarymanagementbackend-1.onrender.com/api/auth/issue-book", { bookId, borrowerId });
      if (res.data.success) {
        setSuccess("Book issued successfully!");
        setBookId("");
        setBorrowerId("");
      } else {
        setError(res.data.message || "Failed to issue book");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Issue Book</h2>
      {success && <p className="text-green-500 mb-2">{success}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleIssueBook} className="flex flex-col gap-2">
        <input 
          value={bookId} 
          onChange={(e) => setBookId(e.target.value)} 
          placeholder="Book ID" 
          className="border p-2 rounded" 
          required
        />
        <input 
          value={borrowerId} 
          onChange={(e) => setBorrowerId(e.target.value)} 
          placeholder="Borrower ID" 
          className="border p-2 rounded" 
          required
        />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Issue Book</button>
      </form>
    </div>
  );
}
