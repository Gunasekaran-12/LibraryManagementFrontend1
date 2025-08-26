import { useEffect, useState } from "react";
import axios from "axios";

export default function BorrowRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("https://librarymanagementbackend-j2qd.onrender.com/api/auth/borrow-records")
      .then(res => setRecords(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Total Records: {records.length}</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-2">Book</th>
            <th className="p-2">Borrower</th>
            <th className="p-2">Issue Date</th>
            <th className="p-2">Return Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{r.book}</td>
              <td className="p-2">{r.borrower}</td>
              <td className="p-2">{r.issueDate}</td>
              <td className="p-2">{r.returnDate || "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
