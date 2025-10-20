import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const { loginWithEmail, signupWithEmail, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    let result;
    if (isLogin) {
      result = await loginWithEmail(formData.email, formData.password);
    } else {
      result = await signupWithEmail(formData.email, formData.password, formData.name);
    }

    if (result.success) {
      navigate('/home');
    } else {
      // Handle error - show user-friendly message
      let errorMessage = result.error;
      
      // Customize Firebase error messages
      if (errorMessage.includes('user-not-found')) {
        errorMessage = 'No account found with this email';
      } else if (errorMessage.includes('wrong-password')) {
        errorMessage = 'Incorrect password';
      } else if (errorMessage.includes('email-already-in-use')) {
        errorMessage = 'An account already exists with this email';
      } else if (errorMessage.includes('weak-password')) {
        errorMessage = 'Password should be at least 6 characters';
      } else if (errorMessage.includes('invalid-email')) {
        errorMessage = 'Invalid email address';
      }
      
      setErrors({ submit: errorMessage });
    }
  };

  const handleGoogleAuth = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      navigate('/home');
    } else {
      let errorMessage = result.error;
      
      // Customize Google auth error messages
      if (errorMessage.includes('popup-closed-by-user')) {
        errorMessage = 'Sign in cancelled';
      } else if (errorMessage.includes('popup-blocked')) {
        errorMessage = 'Please allow popups for this site';
      }
      
      setErrors({ submit: errorMessage });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Floating bubble decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-green-200 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-10 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-green-300 rounded-full opacity-30 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full opacity-25 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-10 h-10 sm:w-12 sm:h-12 bg-green-200 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Animated Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden transform transition-all duration-500 hover:shadow-green-200">
          {/* Decorative top wave */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-400"></div>
          
          {/* Cleaning product icons */}
          <div className="absolute top-4 right-4 opacity-10 animate-pulse hidden sm:block">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.36 2.72l1.42 1.42-5.72 5.71c1.07 1.54 1.22 3.39.32 5.05-.9 1.66-2.67 2.68-4.56 2.82V19h3v2H9v-2h3v-1.28c-1.89-.14-3.66-1.16-4.56-2.82-.9-1.66-.75-3.51.32-5.05L2.04 4.14 3.46 2.72l15.9 15.9zM12 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
            </svg>
          </div>

          <div className="absolute bottom-4 left-4 opacity-10 animate-pulse hidden sm:block" style={{ animationDelay: '1s' }}>
            <svg className="w-10 h-10 sm:w-14 sm:h-14 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11h-1V3c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v8H8c-2.76 0-5 2.24-5 5v7h18v-7c0-2.76-2.24-5-5-5zm-5-8h2v8h-2V3z"/>
            </svg>
          </div>

          {/* Header with icon */}
          <div className="text-center mb-6 sm:mb-8 relative">
            <div className="inline-block mb-3 sm:mb-4 relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75S7 8 17 8z"/>
                </svg>
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mb-2 transition-all duration-500">
              {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 transition-all duration-500">
              {isLogin ? 'Keep your space sparkling clean ✨' : 'Start your cleaning journey 🧼'}
            </p>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-4 sm:mb-6 animate-slideIn">
              <div className="flex items-center text-sm sm:text-base">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
                </svg>
                {errors.submit}
              </div>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* Name field */}
            {!isLogin && (
              <div className="transform transition-all duration-500">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="mr-2">👤</span> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-300 text-base"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email field */}
            <div className="transform transition-all duration-300">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="mr-2">📧</span> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-300 text-base"
                placeholder="your@email.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="transform transition-all duration-300">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="mr-2">🔒</span> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-300 text-base"
                placeholder="••••••••"
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password field */}
            {!isLogin && (
              <div className="transform transition-all duration-500">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="mr-2">🔐</span> Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-300 text-base"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
                    </svg>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-3.5 px-4 rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </span>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 sm:my-8 flex items-center">
            <div className="flex-1 border-t-2 border-gray-200"></div>
            <span className="px-3 sm:px-4 text-gray-500 text-xs sm:text-sm font-semibold">OR</span>
            <div className="flex-1 border-t-2 border-gray-200"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 sm:py-3.5 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-sm sm:text-base flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg className="w-5 h-5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Toggle mode */}
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-sm sm:text-base text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleMode}
                type="button"
                className="text-green-600 hover:text-green-700 font-bold transition-all duration-200 focus:outline-none underline decoration-2 decoration-green-300 hover:decoration-green-500"
              >
                {isLogin ? 'Sign up here!' : 'Sign in here!'}
              </button>
            </p>
          </div>
        </div>

        {/* Sparkle animation below card */}
        <div className="text-center mt-4 sm:mt-6 text-gray-500 text-xs sm:text-sm animate-pulse">
          ✨ Making your life cleaner, one login at a time ✨
        </div>
      </div>
    </div>
  );
};

export default Auth;