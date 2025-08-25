import { useEffect, useState } from "react";
import { UserCheck, Plus, Trash2, Mail, Search, Shield, Star, User } from 'lucide-react';

export default function Librarians() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // Mock API client for demo
  const client = {
    get: async () => ({ data: [
      { id: 1, name: "Sarah Johnson", email: "sarah.johnson@library.com" },
      { id: 2, name: "Michael Chen", email: "michael.chen@library.com" },
      { id: 3, name: "Emma Davis", email: "emma.davis@library.com" },
      { id: 4, name: "David Wilson", email: "david.wilson@library.com" },
    ]}),
    post: async () => ({}),
    delete: async () => ({})
  };

  const load = async () => {
    const { data } = await client.get("/librarians");
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await client.post("/librarians", form);
    setForm({ name: "", email: "" });
    load();
  };

  const remove = async (id) => {
    await client.delete(`/librarians/${id}`);
    load();
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomGradient = (index) => {
    const gradients = [
      'bg-gradient-to-r from-indigo-400 to-indigo-600',
      'bg-gradient-to-r from-purple-400 to-purple-600',
      'bg-gradient-to-r from-pink-400 to-pink-600',
      'bg-gradient-to-r from-blue-400 to-blue-600',
      'bg-gradient-to-r from-teal-400 to-teal-600',
      'bg-gradient-to-r from-cyan-400 to-cyan-600',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Librarians Management
                </h2>
                <p className="text-gray-600">Manage library staff and administrators</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="bg-gradient-to-r from-indigo-100 to-purple-200 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-indigo-700">{items.length}</p>
              <p className="text-sm text-indigo-600">Active Librarians</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add Librarian Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-indigo-500">
          <div className="flex items-center mb-4">
            <Plus className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Add New Librarian</h3>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                placeholder="Full Name"
                value={form.name} 
                onChange={e=>setForm({...form,name:e.target.value})}
                required
              />
            </div>
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                placeholder="Email Address"
                type="email"
                value={form.email} 
                onChange={e=>setForm({...form,email:e.target.value})}
                required
              />
            </div>
            <button 
              onClick={create}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Librarian</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search librarians by name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Librarians Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((librarian, index) => (
            <div key={librarian.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
              {/* Card Header */}
              <div className="h-2 bg-gradient-to-r from-indigo-400 to-purple-600"></div>
              
              <div className="p-6">
                {/* Profile Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${getRandomGradient(index)}`}>
                    {getInitials(librarian.name)}
                  </div>
                  
                  {/* Admin Badge */}
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium">
                    <Shield className="w-3 h-3" />
                    <span>Staff</span>
                  </div>
                </div>

                {/* Librarian Details */}
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-3">{librarian.name}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600 text-sm">
                      <Mail className="w-4 h-4 text-indigo-500" />
                      <span className="break-all">{librarian.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-500 text-xs">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>Library Administrator</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button 
                    onClick={()=>remove(librarian.id)} 
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Remove</span>
                  </button>
                  
                  <div className="text-xs text-gray-500">
                    ID: {librarian.id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Librarians Found</h3>
            <p className="text-gray-500">
              {searchTerm ? "Try adjusting your search criteria" : "Start by adding your first librarian"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}