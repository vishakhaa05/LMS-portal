import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eventora_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    // Default to admin for convenient preview, or can be customer
    return initialUsers[0]; // Admin by default
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('eventora_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eventora_auth_user');
    }
  }, [user]);

  const login = (email, password, forcedRole = null) => {
    const roleToFind = forcedRole || 'customer';
    const existing = initialUsers.find(
      (u) => (u.email.toLowerCase() === email.toLowerCase() || u.role === roleToFind)
    );

    if (existing) {
      setUser(existing);
      return { success: true, user: existing };
    }

    // Fallback new demo user
    const newUser = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].replace('.', ' '),
      email,
      role: roleToFind,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      eventsCount: 0
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const register = (data) => {
    const newUser = {
      id: 'usr-' + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role || 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      vendorId: data.role === 'vendor' ? 'ven-1' : undefined,
      businessName: data.businessName,
      phone: data.phone || '+1 (555) 000-0000',
      eventsCount: 0
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole) => {
    if (newRole === 'admin') {
      setUser(initialUsers[0]); // Alexander Cross
    } else if (newRole === 'vendor') {
      setUser(initialUsers[1]); // Elena & Mark (Lumina Lens)
    } else {
      setUser(initialUsers[2]); // Sophia Miller
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

