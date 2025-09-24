import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoutes from './components/common/ProtectedRoutes';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';

// Component to redirect users based on their role
const RoleBasedRedirect = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  
  // If not authenticated, show homepage
  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  
  // If authenticated and admin, go to admin dashboard, otherwise stay on home
  return isAdmin ? <Navigate to="/admin" replace /> : <Navigate to="/home" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Default route redirects based on auth status */}
          <Route path="/" element={<RoleBasedRedirect />} />
          
          {/* Admin only route */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoutes adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoutes>
            } 
          />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;