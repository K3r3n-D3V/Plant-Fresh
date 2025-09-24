// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Mock login function - replace with actual authentication
//   const login = async (email, password) => {
//     setIsLoading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Mock user data - in real app, this would come from your backend
//       const mockUser = {
//         id: 1,
//         email: email,
//         role: email.includes('admin') ? 'admin' : 'user',
//         name: email.includes('admin') ? 'Admin User' : 'Regular User'
//       };
      
//       setUser(mockUser);
//       localStorage.setItem('user', JSON.stringify(mockUser));
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: 'Login failed' };
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   // Check if user exists in localStorage on app start
//   useState(() => {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   });

//   const value = {
//     user,
//     login,
//     logout,
//     isLoading,
//     isAuthenticated: !!user,
//     isAdmin: user?.role === 'admin'
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


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
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Email/password login
  const loginWithEmail = async (email, password) => {
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Email/password signup
  const signupWithEmail = async (email, password, name) => {
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // You can update profile here if needed
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Google login/signup
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
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
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};