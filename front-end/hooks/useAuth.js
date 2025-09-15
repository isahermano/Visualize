import { useState, useEffect, createContext, useContext } from 'react';

const API_BASE_URL = 'http://localhost:4000/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  });

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: getAuthHeaders()
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Invalid token, remove it
          localStorage.removeItem('token');
          setToken(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const addFavorite = async (algorithmId) => {
    if (!user) return { success: false, error: 'Not logged in' };

    try {
      const response = await fetch(`${API_BASE_URL}/favorites/${algorithmId}`, {
        method: 'POST',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add favorite');
      }

      setUser(prev => ({
        ...prev,
        favorites: data.favorites
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const removeFavorite = async (algorithmId) => {
    if (!user) return { success: false, error: 'Not logged in' };

    try {
      const response = await fetch(`${API_BASE_URL}/favorites/${algorithmId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove favorite');
      }

      setUser(prev => ({
        ...prev,
        favorites: data.favorites
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateProgress = async (algorithmId, completed = false) => {
    if (!user) return { success: false, error: 'Not logged in' };

    try {
      const response = await fetch(`${API_BASE_URL}/progress/${algorithmId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ completed })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update progress');
      }

      setUser(prev => ({
        ...prev,
        progress: data.progress
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const isFavorite = (algorithmId) => {
    return user?.favorites?.some(fav => fav.algorithmId === algorithmId) || false;
  };

  const getProgress = (algorithmId) => {
    return user?.progress?.find(p => p.algorithmId === algorithmId) || null;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    addFavorite,
    removeFavorite,
    updateProgress,
    isFavorite,
    getProgress,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};