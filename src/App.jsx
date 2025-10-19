import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProtectedRoutes from './components/common/ProtectedRoutes';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import Blogs from './pages/users/Blogs';
import ContactUs from './pages/users/ContactUs';
import AboutUs from './pages/users/AboutUs';
import Cart from './components/users/Cart';
import Products from './pages/users/Products';
import Wishlist from './pages/users/WishList';
import Profile from './pages/auth/Profile';

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
      <CartProvider>
        <WishlistProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Default route redirects based on auth status */}
            <Route path="/" element={<RoleBasedRedirect />} />
            
            {/* Protected routes - require authentication */}
            <Route 
              path="/blogs" 
              element={
                <ProtectedRoutes>
                  <Blogs />
                </ProtectedRoutes>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <ProtectedRoutes>
                  <ContactUs />
                </ProtectedRoutes>
              } 
            />
            <Route 
              path="/about" 
              element={
                <ProtectedRoutes>
                  <AboutUs />
                </ProtectedRoutes>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <ProtectedRoutes>
                  <Cart />
                </ProtectedRoutes>
              } 
            />
            <Route 
              path="/products" 
              element={
                <ProtectedRoutes>
                  <Products />
                </ProtectedRoutes>
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                <ProtectedRoutes>
                  <Wishlist />
                </ProtectedRoutes>
              } 
            />
          <Route 
              path="/profile" 
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              } 
            />
            
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
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;