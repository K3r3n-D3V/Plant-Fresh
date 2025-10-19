import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ShoppingCart, User, Leaf, Menu, X, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get cart count from localStorage if CartContext is not available
  const getCartCountFallback = () => {
    try {
      const savedCart = localStorage.getItem('plantfresh_cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        return cart.reduce((total, item) => total + item.quantity, 0);
      }
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
    }
    return 0;
  };

  // Get wishlist count from localStorage if WishlistContext is not available
  const getWishlistCountFallback = () => {
    try {
      const savedWishlist = localStorage.getItem('plantfresh_wishlist');
      if (savedWishlist) {
        const wishlist = JSON.parse(savedWishlist);
        return wishlist.length;
      }
    } catch (error) {
      console.error('Error reading wishlist from localStorage:', error);
    }
    return 0;
  };

  // Check if welcome has been shown for current user
  const hasWelcomeBeenShown = () => {
    try {
      const shownWelcome = localStorage.getItem('plantfresh_welcome_shown');
      const lastUser = localStorage.getItem('plantfresh_last_user');
      return shownWelcome === 'true' && lastUser === user?.id;
    } catch (error) {
      return false;
    }
  };

  // Mark welcome as shown for current user
  const markWelcomeAsShown = () => {
    try {
      localStorage.setItem('plantfresh_welcome_shown', 'true');
      localStorage.setItem('plantfresh_last_user', user?.id || '');
    } catch (error) {
      console.error('Error saving welcome state:', error);
    }
  };

  const cartCount = getCartCount ? getCartCount() : getCartCountFallback();
  const wishlistCount = getWishlistCount ? getWishlistCount() : getWishlistCountFallback();

  useEffect(() => {
    // Only show welcome message if:
    // 1. User is authenticated
    // 2. We have user data
    // 3. Welcome hasn't been shown for this user yet
    if (isAuthenticated && user && !hasWelcomeBeenShown()) {
      setShowWelcome(true);
      setWelcomeVisible(true);
      markWelcomeAsShown();
      
      // Hide welcome message after 3 seconds with fade animation
      const timer = setTimeout(() => {
        setWelcomeVisible(false);
        // Remove from DOM after animation completes
        setTimeout(() => setShowWelcome(false), 500);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user]);

  // Reset welcome state when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setShowWelcome(false);
      setWelcomeVisible(false);
    }
  }, [isAuthenticated]);

  // Check if current path matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/home" className="text-2xl font-bold text-green-600 hover:text-green-700 transition duration-200 flex items-center gap-2">
              <Leaf className="w-7 h-7" />
              PlantFresh
            </Link>
          </div>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/home" 
              className={`font-medium transition-colors ${
                isActive('/home') ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${
                isActive('/about') ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/products" 
              className={`font-medium transition-colors ${
                isActive('/products') ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/blogs" 
              className={`font-medium transition-colors ${
                isActive('/blogs') ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-green-600 font-bold' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Section - Wishlist, Cart, Login/User */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <Link 
              to="/wishlist" 
              className={`relative p-2 transition duration-200 ${
                isActive('/wishlist') ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Icon */}
            <Link 
              to="/cart" 
              className={`relative p-2 transition duration-200 ${
                isActive('/cart') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                {/* Welcome Message with fade animation - Only shows once per user */}
                {showWelcome && (
                  <span 
                    className={`text-gray-700 hidden sm:block transition-all duration-500 ${
                      welcomeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  >
                    Welcome, {user?.name}!
                  </span>
                )}
                
                {/* Profile Icon - Always visible for authenticated users */}
                <Link
                  to="/profile"
                  className={`p-2 transition-all duration-300 transform hover:scale-110 ${
                    isActive('/profile') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  <User className="w-6 h-6" />
                </Link>

                {/* Conditionally render the Admin Dashboard link */}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 text-sm font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200 text-sm font-medium"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-green-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/home" 
                className={`px-4 py-2 hover:bg-gray-50 transition-colors ${
                  isActive('/home') ? 'text-green-600 font-bold bg-green-50' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-2 hover:bg-gray-50 transition-colors ${
                  isActive('/about') ? 'text-green-600 font-bold bg-green-50' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/products" 
                className={`px-4 py-2 hover:bg-gray-50 transition-colors ${
                  isActive('/products') ? 'text-green-600 font-bold bg-green-50' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/blogs" 
                className={`px-4 py-2 hover:bg-gray-50 transition-colors ${
                  isActive('/blogs') ? 'text-green-600 font-bold bg-green-50' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className={`px-4 py-2 hover:bg-gray-50 transition-colors ${
                  isActive('/contact') ? 'text-green-600 font-bold bg-green-50' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Wishlist Mobile Link */}
              <Link 
                to="/wishlist" 
                className={`px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                  isActive('/wishlist') ? 'text-red-600 font-bold bg-red-50' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              {/* Cart Mobile Link */}
              <Link 
                to="/cart" 
                className={`px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                  isActive('/cart') ? 'text-green-600 font-bold bg-green-50' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Shopping Cart</span>
                {cartCount > 0 && (
                  <span className="bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;