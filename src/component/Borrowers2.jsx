import { useEffect, useState } from "react";
import axios from "axios";

export default function Borrowers() {
  const [borrowers, setBorrowers] = useState([]);

  useEffect(() => {
    axios.get("https://librarymanagementbackend-j2qd.onrender.com/borrowers")
      .then(res => setBorrowers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Total Borrowers: {borrowers.length}</h2>
      <ul className="bg-white shadow rounded p-4">
        {borrowers.map(b => (
          <li key={b.id} className="border-b p-2">{b.name} ({b.email})</li>
        ))}
      </ul>
    </div>
  );
}
