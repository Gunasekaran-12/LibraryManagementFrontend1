import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Camera, Shield, BookOpen, Clock, Award, Settings } from 'lucide-react';

export default function Profile() {

    const [user, setUser] = useState({
    id: 1,
    name: 'Ajay',
    email: 'Ajay@example.com',
    phone: '+91 8637621737',
    address: '123 Library Street, Booktown, BT 12345',
    joinDate: '2023-01-15',
    role: 'Admin',
    avatar: null,
    bio: 'Passionate librarian with 5 years of experience in digital library management.',
    booksIssued: 145,
    activeBorrowers: 32,
    totalReturns: 89
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({...user});

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({...user});
  };

  const handleSave = () => {
    setUser({...editForm});
    setIsEditing(false);
    // Add your API call here to update user data
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({...user});
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const stats = [
    {
      title: 'Books Issued',
      value: user.booksIssued,
      icon: BookOpen,
      gradient: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700',
      description: 'Total books issued'
    },
    {
      title: 'Active Borrowers',
      value: user.activeBorrowers,
      icon: User,
      gradient: 'bg-gradient-to-br from-green-500 via-green-600 to-green-700',
      description: 'Currently active'
    },
    {
      title: 'Total Returns',
      value: user.totalReturns,
      icon: Clock,
      gradient: 'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700',
      description: 'Books returned'
    },
    {
      title: 'Experience',
      value: '5Y',
      icon: Award,
      gradient: 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700',
      description: 'Years of service'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Cover Background */}
          <div className="h-48 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 group"
                >
                  <Edit3 className="w-4 h-4 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium">Edit Profile</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 group"
                  >
                    <Save className="w-4 h-4 group-hover:scale-110 transition-all duration-300" />
                    <span className="font-medium">Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 group"
                  >
                    <X className="w-4 h-4 group-hover:scale-110 transition-all duration-300" />
                    <span className="font-medium">Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 rounded-2xl shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden relative group">
                  {/* Animated Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-500/30 to-blue-500/20 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-all duration-500"></div>
                  
                  {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover relative z-10" />
                  ) : (
                    <span className="text-4xl font-bold text-white relative z-10 drop-shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  
                  {/* Sparkle Effects */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-110">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* User Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-purple-600 transition-colors"
                    />
                  ) : (
                    <div className="flex flex-col">
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        {user.name}
                      </h1>
                      <p className="text-sm bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent font-semibold -mt-1">
                        Profile
                      </p>
                    </div>
                  )}
                  <div className="px-3 py-1 bg-gradient-to-r from-violet-100 via-purple-100 to-indigo-100 text-purple-800 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg border border-purple-200">
                    <Shield className="w-3 h-3 text-purple-600" />
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 text-gray-600 p-3 rounded-xl bg-gradient-to-r from-purple-50/50 to-indigo-50/50 hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-600 transition-colors text-gray-800 font-medium"
                      />
                    ) : (
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Email Address</p>
                        <p className="text-gray-800 font-semibold">{user.email}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-gray-600 p-3 rounded-xl bg-gradient-to-r from-green-50/50 to-emerald-50/50 hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="flex-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-600 transition-colors text-gray-800 font-medium"
                      />
                    ) : (
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                        <p className="text-gray-800 font-semibold">{user.phone}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-gray-600 p-3 rounded-xl bg-gradient-to-r from-red-50/50 to-pink-50/50 hover:from-red-50 hover:to-pink-50 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="flex-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-600 transition-colors text-gray-800 font-medium"
                      />
                    ) : (
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Address</p>
                        <p className="text-gray-800 font-semibold">{user.address}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-gray-600 p-3 rounded-xl bg-gradient-to-r from-orange-50/50 to-amber-50/50 hover:from-orange-50 hover:to-amber-50 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Member Since</p>
                      <p className="text-gray-800 font-semibold">
                        {new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50/80 to-blue-50/80 rounded-xl border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    About
                  </h3>
                  {isEditing ? (
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-white"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed font-medium">{user.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.gradient} p-6 rounded-xl shadow-lg text-white relative overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon size={32} className="text-white opacity-90" />
                  <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                </div>
                <h3 className="text-sm font-medium opacity-90 mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs opacity-75">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Account Settings</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 group-hover:text-gray-900">Change Password</span>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 group-hover:text-gray-900">Privacy Settings</span>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 group-hover:text-gray-900">Notification Preferences</span>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Issued "The Great Gatsby"</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Added new borrower</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Updated library records</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}