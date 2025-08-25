import { useEffect, useState } from "react";
import { BookOpen, Plus, Trash2, CheckCircle, XCircle, Search, Filter, BookMarked } from 'lucide-react';

export function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailable, setFilterAvailable] = useState("all");

  // Mock API client for demo
  const client = {
    get: async () => ({ data: [
      { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: true },
      { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", available: false },
      { id: 3, title: "1984", author: "George Orwell", available: true },
    ]}),
    post: async () => ({}),
    delete: async () => ({})
  };

  const load = async () => {
    const { data } = await client.get("/books");
    setBooks(data);
  };
  
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await client.post("/books", { ...form, available: true });
    setForm({ title: "", author: "" });
    load();
  };

  const remove = async (id) => {
    await client.delete(`/books/${id}`);
    load();
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAvailable === "all" ||
                         (filterAvailable === "available" && book.available) ||
                         (filterAvailable === "borrowed" && !book.available);
    return matchesSearch && matchesFilter;
  });

  const availableCount = books.filter(b => b.available).length;
  const borrowedCount = books.filter(b => !b.available).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Books Management
                </h2>
                <p className="text-gray-600">Manage your library's book collection</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex space-x-4">
              <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-700">{availableCount}</p>
                <p className="text-sm text-green-600">Available</p>
              </div>
              <div className="bg-gradient-to-r from-red-100 to-red-200 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-red-700">{borrowedCount}</p>
                <p className="text-sm text-red-600">Borrowed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add Book Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <Plus className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Add New Book</h3>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <BookMarked className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                placeholder="Book Title"
                value={form.title} 
                onChange={e=>setForm({...form,title:e.target.value})}
                required
              />
            </div>
            <div className="flex-1 relative">
              <input 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                placeholder="Author Name"
                value={form.author} 
                onChange={e=>setForm({...form,author:e.target.value})}
                required
              />
            </div>
            <button 
              onClick={create}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Book</span>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterAvailable}
                onChange={e => setFilterAvailable(e.target.value)}
              >
                <option value="all">All Books</option>
                <option value="available">Available Only</option>
                <option value="borrowed">Borrowed Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <div key={book.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
              {/* Book Header */}
              <div className={`h-2 ${book.available ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}></div>
              
              <div className="p-6">
                {/* Book Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${book.available ? 'bg-gradient-to-r from-green-100 to-green-200' : 'bg-gradient-to-r from-red-100 to-red-200'}`}>
                    <BookOpen className={`w-6 h-6 ${book.available ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {book.available ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{book.available ? "Available" : "Borrowed"}</span>
                  </div>
                </div>

                {/* Book Details */}
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button 
                    onClick={()=>remove(book.id)} 
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                  
                  <div className="text-xs text-gray-500">
                    ID: {book.id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Books Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}