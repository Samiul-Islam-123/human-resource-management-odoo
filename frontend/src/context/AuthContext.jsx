import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth state on first load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/users/profile/me');
          if (response.data.success) {
            setUser(response.data.data);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (loginId, password, expectedRole) => {
    try {
      const response = await api.post('/auth/login', { email: loginId, employeeId: loginId, password });
      console.log(response)
      
      if (response.data.success) {
        const { token, user: userData } = response.data.data;
        
        // Simple role check logic before full login:
        // If login is from Admin portal, expect admin/hr
        // If login is from Employee portal, expect employee (or let admin login anyway? We will let protected routes handle it or check here)
        if (expectedRole === 'admin' && userData.role === 'employee') {
            throw new Error("Unauthorized access. Admin privileges required.");
        }
        // Alternatively, if they login from employee portal and they are admin, maybe that's fine, or we redirect to admin dashboard. We'll handle routing outside.

        localStorage.setItem('token', token);
        setUser(userData);
        return userData;
      }
      throw new Error(response.data.message || "Login failed");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
