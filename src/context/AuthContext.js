import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    try {
      // Check if user data exists in localStorage
      const savedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (savedUser && token) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      // Clear invalid data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      // Replace this with your actual login API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const { user: userData, token } = data;
        
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        setUser(userData);
        setIsLoggedIn(true);
        return { success: true, user: userData };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear stored data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Reset state
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateUser = (updatedUserData) => {
    // Update user data in state and localStorage
    const newUserData = { ...user, ...updatedUserData };
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
    return newUserData;
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      // Replace this with your actual register API call
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        const { user: newUser, token } = data;
        
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', token);
        
        setUser(newUser);
        setIsLoggedIn(true);
        return { success: true, user: newUser };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Network error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    register,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;