import { useState } from "react";
import axios from "axios";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://librarymanagementbackend-1.onrender.com/api/auth/books", { title, author });
      if (res.data.success) setSuccess("Book added successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleAddBook} className="flex flex-col gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book Title" className="border p-2 rounded" />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Book</button>
      </form>
    </div>
  );
}
