import { useEffect, useState } from "react";
import { BookOpen, Users, Calendar, CheckCircle, XCircle, Plus, Trash2, RotateCcw, Clock, User } from 'lucide-react';

export default function BorrowRecords() {
  const [records, setRecords] = useState([]);
  const [books, setBooks] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [form, setForm] = useState({ bookId: "", borrowerId: "" });

  // Mock API client for demo
  const client = {
    get: async (endpoint) => {
      if (endpoint === "/borrow-records") {
        return { data: [
          { 
            id: 1, 
            borrower: { name: "John Doe", id: 1 }, 
            book: { title: "The Great Gatsby", id: 1 }, 
            borrowDate: "2025-08-15", 
            returnDate: null 
          },
          { 
            id: 2, 
            borrower: { name: "Jane Smith", id: 2 }, 
            book: { title: "To Kill a Mockingbird", id: 2 }, 
            borrowDate: "2025-08-10", 
            returnDate: "2025-08-20" 
          },
          { 
            id: 3, 
            borrower: { name: "Alice Johnson", id: 3 }, 
            book: { title: "1984", id: 3 }, 
            borrowDate: "2025-08-18", 
            returnDate: null 
          },
        ]};
      }
      if (endpoint === "/books") {
        return { data: [
          { id: 4, title: "Pride and Prejudice", available: true },
          { id: 5, title: "The Catcher in the Rye", available: true },
        ]};
      }
      if (endpoint === "/borrowers") {
        return { data: [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
          { id: 3, name: "Alice Johnson" },
        ]};
      }
    },
    post: async () => ({}),
    delete: async () => ({})
  };

  const load = async () => {
    const [r1, r2, r3] = await Promise.all([
      client.get("/borrow-records"),
      client.get("/books"),
      client.get("/borrowers"),
    ]);
    setRecords(r1.data);
    setBooks(r2.data.filter(b => b.available));
    setBorrowers(r3.data);
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await client.post(`/borrow-records?borrowerId=${form.borrowerId}&bookId=${form.bookId}`);
    setForm({ bookId: "", borrowerId: "" });
    load();
  };

  const returnBook = async (id) => {
    await client.post(`/borrow-records/${id}/return`);
    load();
  };

  const remove = async (id) => {
    await client.delete(`/borrow-records/${id}`);
    load();
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (returnDate) => {
    return returnDate ? 'text-green-600' : 'text-orange-600';
  };

  const getStatusBg = (returnDate) => {
    return returnDate ? 'bg-green-100' : 'bg-orange-100';
  };

  const getDaysOverdue = (borrowDate) => {
    const borrowed = new Date(borrowDate);
    const today = new Date();
    const diffTime = today - borrowed;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays - 14); // Assuming 14 days is the loan period
  };

  const activeRecords = records.filter(r => !r.returnDate);
  const completedRecords = records.filter(r => r.returnDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                  Borrow Records
                </h2>
                <p className="text-gray-600">Track book borrowing and returns</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex space-x-4">
              <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-orange-700">{activeRecords.length}</p>
                <p className="text-sm text-orange-600">Active</p>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-700">{completedRecords.length}</p>
                <p className="text-sm text-green-600">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Create Record Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-purple-500">
          <div className="flex items-center mb-4">
            <Plus className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Create New Borrow Record</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <select 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all" 
                value={form.borrowerId}
                onChange={e=>setForm({...form,borrowerId:e.target.value})} 
                required
              >
                <option value="">Select Borrower</option>
                {borrowers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <select 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all" 
                value={form.bookId}
                onChange={e=>setForm({...form,bookId:e.target.value})} 
                required
              >
                <option value="">Select Available Book</option>
                {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
              </select>
            </div>
            
            <button 
              onClick={create}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-orange-600 hover:from-purple-600 hover:to-orange-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Create Record</span>
            </button>
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 px-6 py-4 border-b">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              All Borrow Records
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Borrower</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Book</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Borrowed</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {records.map((record, index) => {
                  const daysOverdue = !record.returnDate ? getDaysOverdue(record.borrowDate) : 0;
                  
                  return (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            index % 2 === 0 ? 'bg-gradient-to-r from-purple-400 to-purple-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'
                          }`}>
                            {getInitials(record.borrower?.name || 'N/A')}
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">{record.borrower?.name}</div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                            <BookOpen className="w-4 h-4 text-white" />
                          </div>
                          <div className="font-medium text-gray-900">{record.book?.title}</div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {record.borrowDate}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.returnDate ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Returned ({record.returnDate})
                          </span>
                        ) : (
                          <div className="space-y-1">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              daysOverdue > 0 ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {daysOverdue > 0 ? `Overdue (${daysOverdue} days)` : 'Active'}
                            </span>
                          </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {!record.returnDate && (
                            <button 
                              onClick={()=>returnBook(record.id)} 
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-lg transition-all"
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span className="text-sm">Return</span>
                            </button>
                          )}
                          <button 
                            onClick={()=>remove(record.id)} 
                            className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {records.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center mt-8">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Borrow Records</h3>
            <p className="text-gray-500">Start by creating your first borrow record</p>
          </div>
        )}
      </div>
    </div>
  );
}