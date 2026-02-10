import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuthAdapter } from '../config/backend';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const authAdapter = await getAuthAdapter();
        const currentUser = await authAdapter.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const authAdapter = await getAuthAdapter();
    const result = await authAdapter.signIn(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const signup = async (email, password, name) => {
    const authAdapter = await getAuthAdapter();
    const result = await authAdapter.signUp(email, password, name);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const logout = async () => {
    const authAdapter = await getAuthAdapter();
    await authAdapter.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
