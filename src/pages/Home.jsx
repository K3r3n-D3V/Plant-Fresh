import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">🌿 Plant Fresh</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700">Welcome, {user?.name}!</span>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-green-600">Plant Fresh</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your ultimate companion for plant care. Track your plants, get care reminders, 
            and connect with fellow plant enthusiasts. Keep your greenery thriving!
          </p>
          
          {!isAuthenticated && (
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition duration-200 text-lg font-semibold"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-green-500 text-green-500 px-8 py-3 rounded-lg hover:bg-green-50 transition duration-200 text-lg font-semibold"
              >
                Learn More
              </Link>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Plant Tracking</h3>
            <p className="text-gray-600">Keep track of all your plants and their care schedules in one place.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Care Reminders</h3>
            <p className="text-gray-600">Never forget to water, fertilize, or repot your plants again.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth Analytics</h3>
            <p className="text-gray-600">Monitor your plants' growth and health over time.</p>
          </div>
        </div>

        {/* For authenticated users - User Dashboard Content */}
        {isAuthenticated && user?.role !== 'admin' && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Plant Dashboard</h2>
            
            {/* User-specific content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-green-500 text-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">12</div>
                <div>Total Plants</div>
              </div>
              <div className="bg-yellow-500 text-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">3</div>
                <div>Need Water</div>
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">2</div>
                <div>Need Care</div>
              </div>
              <div className="bg-green-600 text-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">7</div>
                <div>Healthy</div>
              </div>
            </div>

            {/* Quick Actions for Users */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Today's Tasks</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">💧 Water Snake Plant</li>
                  <li className="flex items-center">🌿 Fertilize Monstera</li>
                  <li className="flex items-center">✂️ Prune Rose Bush</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Recent Activity</h3>
                <ul className="space-y-2">
                  <li className="text-sm">Watered Pothos - 2 days ago</li>
                  <li className="text-sm">Added new Spider Plant - 3 days ago</li>
                  <li className="text-sm">Fertilized Orchid - 1 week ago</li>
                </ul>
              </div>
            </div>

            {/* Plant Collection Preview */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">My Plant Collection</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Snake Plant', 'Monstera', 'Pothos', 'Orchid'].map((plant, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="text-2xl mb-2">🌵</div>
                    <div className="font-medium">{plant}</div>
                    <div className="text-sm text-green-600">Healthy</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* For admin users - Quick admin access */}
        {isAuthenticated && user?.role === 'admin' && (
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Admin Access</h2>
            <p className="text-gray-600 mb-6">You have administrator privileges.</p>
            <Link
              to="/admin"
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition duration-200 text-lg font-semibold"
            >
              Go to Admin Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;