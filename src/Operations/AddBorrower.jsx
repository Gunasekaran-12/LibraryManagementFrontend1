import { useState } from "react";
import axios from "axios";

export default function AddBorrower() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleAddBorrower = async (e) => {
    e.preventDefault();
    setSuccess(""); 
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/borrowers", { name, email });
      if (res.data.success) {
        setSuccess("Borrower added successfully!");
        setName("");
        setEmail("");
      } else {
        setError(res.data.message || "Failed to add borrower");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Borrower</h2>
      {success && <p className="text-green-500 mb-2">{success}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleAddBorrower} className="flex flex-col gap-2">
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Borrower Name" 
          className="border p-2 rounded" 
          required
        />
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Borrower Email" 
          className="border p-2 rounded" 
          type="email"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Borrower</button>
      </form>
    </div>
  );
}
