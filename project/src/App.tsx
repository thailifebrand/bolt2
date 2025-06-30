import React, { useState, useEffect } from 'react';
import { MetricCard } from './components/MetricCard';
import { DepartmentCard } from './components/DepartmentCard';
import { UploadModal } from './components/UploadModal';
import { Chart } from './components/Chart';
import { 
  FileText, 
  Users, 
  Building2, 
  Upload,
  BarChart3,
  TrendingUp,
  Calendar,
  Bell
} from 'lucide-react';

function App() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [notifications, setNotifications] = useState(2);

  // Mock data - in a real app this would come from an API
  const [dashboardData, setDashboardData] = useState({
    totalSubmissions: 247,
    submissionChange: 23.5,
    totalPeople: 89,
    peopleChange: 15.2,
    totalDepartments: 12,
    departmentChange: 8.3,
    departments: [
      { name: 'Research & Development', submissions: 78, people: 23, color: 'bg-blue-600', percentage: 32 },
      { name: 'Engineering', submissions: 52, people: 18, color: 'bg-green-600', percentage: 21 },
      { name: 'Product Design', submissions: 43, people: 15, color: 'bg-purple-600', percentage: 17 },
      { name: 'Marketing', submissions: 31, people: 12, color: 'bg-amber-600', percentage: 13 },
      { name: 'Operations', submissions: 28, people: 11, color: 'bg-red-600', percentage: 11 },
      { name: 'Sales', submissions: 15, people: 10, color: 'bg-indigo-600', percentage: 6 },
    ]
  });

  const chartData = dashboardData.departments.map(dept => ({
    label: dept.name,
    value: dept.submissions,
    color: dept.color.replace('bg-', 'bg-')
  }));

  const handleUploadSubmit = (data: any) => {
    // In a real app, this would send data to an API
    console.log('New submission:', data);
    
    // Update dashboard data
    setDashboardData(prev => ({
      ...prev,
      totalSubmissions: prev.totalSubmissions + 1,
      totalPeople: prev.totalPeople + 1
    }));

    setNotifications(prev => prev + 1);
    
    // Show success message
    alert('Innovation work submitted successfully!');
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Innovation Dashboard</h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {currentDate}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <Bell className="w-6 h-6" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New Work</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Key Metrics</h2>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              Compared to last 7 days
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Total Submissions"
              value={dashboardData.totalSubmissions}
              change={dashboardData.submissionChange}
              changeType="increase"
              icon={<FileText className="w-6 h-6 text-blue-600" />}
              subtitle="Innovation works submitted"
            />
            <MetricCard
              title="Active Contributors"
              value={dashboardData.totalPeople}
              change={dashboardData.peopleChange}
              changeType="increase"
              icon={<Users className="w-6 h-6 text-blue-600" />}
              subtitle="People contributing ideas"
            />
            <MetricCard
              title="Participating Departments"
              value={dashboardData.totalDepartments}
              change={dashboardData.departmentChange}
              changeType="increase"
              icon={<Building2 className="w-6 h-6 text-blue-600" />}
              subtitle="Departments involved"
            />
          </div>
        </div>

        {/* Charts and Department Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Chart data={chartData} title="Submissions by Department" />
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Trend</h3>
            <div className="space-y-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const value = Math.floor(Math.random() * 40) + 10;
                return (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-12">{day}</span>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-700"
                          style={{ 
                            width: `${value}%`,
                            animationDelay: `${index * 0.1}s`
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-8">{Math.floor(value * 0.6)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Department Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Department Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.departments.map((dept, index) => (
              <DepartmentCard
                key={index}
                name={dept.name}
                submissions={dept.submissions}
                people={dept.people}
                color={dept.color}
                percentage={dept.percentage}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { name: 'Sarah Johnson', department: 'Research & Development', work: 'AI-Powered Analytics Tool', time: '2 hours ago' },
              { name: 'Mike Chen', department: 'Engineering', work: 'Automated Testing Framework', time: '4 hours ago' },
              { name: 'Emma Wilson', department: 'Product Design', work: 'User Experience Enhancement', time: '6 hours ago' },
              { name: 'David Martinez', department: 'Operations', work: 'Process Optimization Model', time: '8 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {activity.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-600">{activity.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{activity.work}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleUploadSubmit}
      />
    </div>
  );
}

export default App;