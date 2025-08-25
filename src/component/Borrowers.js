import { useEffect, useState } from "react";
import { Users, Plus, Trash2, Phone, Mail, Search, UserPlus, User } from 'lucide-react';

export default function Borrowers() {
  const [borrowers, setBorrowers] = useState([]);
  const [form, setForm] = useState({ name: "", contact: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // Mock API client for demo
  const client = {
    get: async () => ({ data: [
      { id: 1, name: "John Doe", contact: "john@example.com" },
      { id: 2, name: "Jane Smith", contact: "+1-234-567-8900" },
      { id: 3, name: "Alice Johnson", contact: "alice@library.com" },
      { id: 4, name: "Bob Wilson", contact: "+1-555-0123" },
    ]}),
    post: async () => ({}),
    delete: async () => ({})
  };

  const load = async () => {
    const { data } = await client.get("/borrowers");
    setBorrowers(data);
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await client.post("/borrowers", form);
    setForm({ name: "", contact: "" });
    load();
  };

  const remove = async (id) => {
    await client.delete(`/borrowers/${id}`);
    load();
  };

  const filteredBorrowers = borrowers.filter(borrower =>
    borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    borrower.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isEmail = (contact) => contact.includes('@');
  const isPhone = (contact) => contact.includes('+') || /^\d+$/.test(contact.replace(/[-\s]/g, ''));

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomGradient = (index) => {
    const gradients = [
      'bg-gradient-to-r from-blue-400 to-blue-600',
      'bg-gradient-to-r from-green-400 to-green-600',
      'bg-gradient-to-r from-purple-400 to-purple-600',
      'bg-gradient-to-r from-pink-400 to-pink-600',
      'bg-gradient-to-r from-indigo-400 to-indigo-600',
      'bg-gradient-to-r from-orange-400 to-orange-600',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Borrowers Management
                </h2>
                <p className="text-gray-600">Manage library borrowers and their information</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="bg-gradient-to-r from-green-100 to-blue-200 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-700">{borrowers.length}</p>
              <p className="text-sm text-green-600">Total Borrowers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add Borrower Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-green-500">
          <div className="flex items-center mb-4">
            <UserPlus className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Add New Borrower</h3>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" 
                placeholder="Full Name"
                value={form.name} 
                onChange={e=>setForm({...form,name:e.target.value})}
                required
              />
            </div>
            <div className="flex-1 relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" 
                placeholder="Contact (Email or Phone)"
                value={form.contact} 
                onChange={e=>setForm({...form,contact:e.target.value})}
                required
              />
            </div>
            <button 
              onClick={create}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Borrower</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Search borrowers by name or contact..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Borrowers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBorrowers.map((borrower, index) => (
            <div key={borrower.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
              {/* Card Header */}
              <div className="h-2 bg-gradient-to-r from-green-400 to-blue-600"></div>
              
              <div className="p-6">
                {/* Profile Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getRandomGradient(index)}`}>
                    {getInitials(borrower.name)}
                  </div>
                  
                  {/* Contact Type Badge */}
                  <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                    {isEmail(borrower.contact) ? <Mail className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                    <span>{isEmail(borrower.contact) ? 'Email' : 'Phone'}</span>
                  </div>
                </div>

                {/* Borrower Details */}
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{borrower.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    {isEmail(borrower.contact) ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                    <span className="break-all">{borrower.contact}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button 
                    onClick={()=>remove(borrower.id)} 
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                  
                  <div className="text-xs text-gray-500">
                    ID: {borrower.id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBorrowers.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Borrowers Found</h3>
            <p className="text-gray-500">
              {searchTerm ? "Try adjusting your search criteria" : "Start by adding your first borrower"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}