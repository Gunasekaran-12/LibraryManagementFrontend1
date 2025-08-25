import { useState } from 'react';
import { BookOpen, Users, Clock, AlertTriangle, UserCheck, Activity, Calendar, TrendingUp, Star } from 'lucide-react';

export default function Home() {
  const [stats] = useState({
    totalBooks: 120,
    totalBorrowers: 45,
    booksBorrowed: 30,
    overdueBooks: 5,
    totalUsers: 10,
  });

  const recentActivities = [
    { book: 'A Tale of Two Cities', borrower: 'John Doe', date: '2025-08-20', status: 'Returned' },
    { book: 'Harry Potter', borrower: 'Alice', date: '2025-08-21', status: 'Pending' },
    { book: '1984', borrower: 'Bob', date: '2025-08-19', status: 'Returned' },
  ];

  const quickActions = [
    { title: 'Add New Book', icon: BookOpen, color: 'bg-gradient-to-r from-blue-500 to-blue-600', hoverColor: 'hover:from-blue-600 hover:to-blue-700' },
    { title: 'Issue Book', icon: Clock, color: 'bg-gradient-to-r from-green-500 to-green-600', hoverColor: 'hover:from-green-600 hover:to-green-700' },
    { title: 'Add Borrower', icon: Users, color: 'bg-gradient-to-r from-purple-500 to-purple-600', hoverColor: 'hover:from-purple-600 hover:to-purple-700' },
    { title: 'View Reports', icon: TrendingUp, color: 'bg-gradient-to-r from-orange-500 to-orange-600', hoverColor: 'hover:from-orange-600 hover:to-orange-700' },
  ];

  const StatCard = ({ title, value, icon: Icon, gradient, textColor }) => (
    <div className={`${gradient} p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-white relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <Icon size={32} className="text-white opacity-90" />
          <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
        </div>
        <h3 className="text-sm font-medium opacity-90">{title}</h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Library Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, Admin! Here's what's happening today.</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin Panel</p>
                <p className="text-xs text-gray-500">August 22, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard 
            title="Total Books" 
            value={stats.totalBooks} 
            icon={BookOpen}
            gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"
          />
          <StatCard 
            title="Active Borrowers" 
            value={stats.totalBorrowers} 
            icon={Users}
            gradient="bg-gradient-to-br from-green-500 via-green-600 to-green-700"
          />
          <StatCard 
            title="Books Borrowed" 
            value={stats.booksBorrowed} 
            icon={Clock}
            gradient="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700"
          />
          <StatCard 
            title="Overdue Books" 
            value={stats.overdueBooks} 
            icon={AlertTriangle}
            gradient="bg-gradient-to-br from-red-500 via-red-600 to-red-700"
          />
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={UserCheck}
            gradient="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-blue-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <button 
                key={idx}
                className={`${action.color} ${action.hoverColor} text-white p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3`}
              >
                <action.icon size={24} />
                <span className="font-medium">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Recent Activity
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Book</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Borrower</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentActivities.map((activity, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">{activity.book}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">{activity.borrower.charAt(0)}</span>
                        </div>
                        <span className="text-gray-900">{activity.borrower}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {activity.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.status === 'Pending' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Returned
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">24 Books</p>
                <p className="text-sm text-green-600 font-medium">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Popular Genre</p>
                <p className="text-2xl font-bold text-gray-900">Fiction</p>
                <p className="text-sm text-purple-600 font-medium">45% of total borrows</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Days</p>
                <p className="text-2xl font-bold text-gray-900">14 Days</p>
                <p className="text-sm text-orange-600 font-medium">Book return time</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}