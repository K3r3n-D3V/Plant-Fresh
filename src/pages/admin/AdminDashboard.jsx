import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-red-600">Plant Fresh - Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span>Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
            <p className="text-gray-600">This is the admin interface for Plant Fresh.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-red-600">User Management</h3>
                <p>Manage system users</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-red-600">Inventory</h3>
                <p>Manage plant inventory</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-red-600">Analytics</h3>
                <p>View system analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;