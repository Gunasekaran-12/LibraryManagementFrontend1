import { useEffect, useState } from "react";
import { Users, Plus, Trash2, Mail, Phone, MapPin, Search, Filter, UserPlus, GraduationCap, Briefcase, UserCheck, User } from 'lucide-react';

export default function UsersComponent() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name:"", email:"", contact:"", address:"", userType:"Student" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock API client for demo
  const client = {
    get: async () => ({ data: [
      { id: 1, name: "Emily Rodriguez", email: "emily.rodriguez@university.edu", contact: "+1-555-0101", address: "123 Campus Drive", userType: "Student" },
      { id: 2, name: "Dr. James Wilson", email: "j.wilson@university.edu", contact: "+1-555-0102", address: "456 Faculty Row", userType: "Faculty" },
      { id: 3, name: "Maria Garcia", email: "maria.garcia@email.com", contact: "+1-555-0103", address: "789 Main Street", userType: "Guest" },
      { id: 4, name: "Alex Thompson", email: "alex.t@university.edu", contact: "+1-555-0104", address: "321 Student Ave", userType: "Student" },
      { id: 5, name: "Prof. Sarah Lee", email: "s.lee@university.edu", contact: "+1-555-0105", address: "654 Academic Blvd", userType: "Faculty" },
    ]}),
    post: async () => ({}),
    delete: async () => ({})
  };

  const load = async () => {
    const { data } = await client.get("/users");
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await client.post("/users", form);
    setForm({ name:"", email:"", contact:"", address:"", userType:"Student" });
    load();
  };

  const remove = async (id) => {
    await client.delete(`/users/${id}`);
    load();
  };

  const filteredItems = items.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || user.userType === filterType;
    return matchesSearch && matchesFilter;
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getUserTypeIcon = (userType) => {
    switch(userType) {
      case 'Student': return GraduationCap;
      case 'Faculty': return Briefcase;
      case 'Guest': return UserCheck;
      default: return User;
    }
  };

  const getUserTypeColor = (userType) => {
    switch(userType) {
      case 'Student': return 'bg-gradient-to-r from-blue-400 to-blue-600';
      case 'Faculty': return 'bg-gradient-to-r from-green-400 to-green-600';
      case 'Guest': return 'bg-gradient-to-r from-purple-400 to-purple-600';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }
  };

  const getUserTypeBadgeColor = (userType) => {
    switch(userType) {
      case 'Student': return 'bg-blue-100 text-blue-800';
      case 'Faculty': return 'bg-green-100 text-green-800';
      case 'Guest': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const userCounts = {
    Student: items.filter(u => u.userType === 'Student').length,
    Faculty: items.filter(u => u.userType === 'Faculty').length,
    Guest: items.filter(u => u.userType === 'Guest').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Users Management
                </h2>
                <p className="text-gray-600">Manage all library users and their information</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex space-x-3">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-blue-700">{userCounts.Student}</p>
                <p className="text-xs text-blue-600">Students</p>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-700">{userCounts.Faculty}</p>
                <p className="text-xs text-green-600">Faculty</p>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-purple-700">{userCounts.Guest}</p>
                <p className="text-xs text-purple-600">Guests</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add User Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <UserPlus className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Add New User</h3>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4 mb-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                placeholder="Full Name"
                value={form.name} 
                onChange={e=>setForm({...form,name:e.target.value})}
                required
              />
            </div>
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                placeholder="Email Address"
                type="email"
                value={form.email} 
                onChange={e=>setForm({...form,email:e.target.value})}
                required
              />
            </div>
            
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                placeholder="Contact Number"
                value={form.contact} 
                onChange={e=>setForm({...form,contact:e.target.value})}
                required
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                placeholder="Address"
                value={form.address} 
                onChange={e=>setForm({...form,address:e.target.value})}
                required
              />
            </div>
            
            <select 
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
              value={form.userType}
              onChange={e=>setForm({...form,userType:e.target.value})}
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Guest">Guest</option>
            </select>
          </div>
          
          <button 
            onClick={create}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search users by name, email, or contact..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
              >
                <option value="all">All Users</option>
                <option value="Student">Students Only</option>
                <option value="Faculty">Faculty Only</option>
                <option value="Guest">Guests Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((user, index) => {
            const TypeIcon = getUserTypeIcon(user.userType);
            
            return (
              <div key={user.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                {/* Card Header */}
                <div className={`h-2 ${getUserTypeColor(user.userType).replace('bg-gradient-to-r', 'bg-gradient-to-r')}`}></div>
                
                <div className="p-6">
                  {/* Profile Section */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getUserTypeColor(user.userType)}`}>
                      {getInitials(user.name)}
                    </div>
                    
                    {/* User Type Badge */}
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getUserTypeBadgeColor(user.userType)}`}>
                      <TypeIcon className="w-3 h-3" />
                      <span>{user.userType}</span>
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="mb-4 space-y-3">
                    <h3 className="font-bold text-lg text-gray-800">{user.name}</h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="break-all">{user.email}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="w-4 h-4 text-green-500" />
                        <span>{user.contact}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span className="break-all">{user.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button 
                      onClick={()=>remove(user.id)} 
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                    
                    <div className="text-xs text-gray-500">
                      ID: {user.id}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Users Found</h3>
            <p className="text-gray-500">
              {searchTerm || filterType !== "all" ? "Try adjusting your search or filter criteria" : "Start by adding your first user"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}