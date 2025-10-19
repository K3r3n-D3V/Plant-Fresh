import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Changed from true to false
  const [isInitializing, setIsInitializing] = useState(true); // New state for initial load

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          role: firebaseUser.email.includes('admin') ? 'admin' : 'user'
        });
      } else {
        setUser(null);
      }
      setIsInitializing(false); // Only set this once on initial load
    });

    return () => unsubscribe();
  }, []);

  // Email/password login
  const loginWithEmail = async (email, password) => {
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      return { success: true, user: result.user };
    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error); // Added logging
      return { success: false, error: error.message };
    }
  };

  // Email/password signup
  const signupWithEmail = async (email, password, name) => {
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      return { success: true, user: result.user };
    } catch (error) {
      setIsLoading(false);
      console.error('Signup error:', error); // Added logging
      return { success: false, error: error.message };
    }
  };

  // Google login/signup
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setIsLoading(false);
      return { success: true, user: result.user };
    } catch (error) {
      setIsLoading(false);
      console.error('Google login error:', error); // Added logging
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    logout,
    isLoading,
    isInitializing, // Expose this for initial app load
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  // Don't render children until we've checked auth state
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};