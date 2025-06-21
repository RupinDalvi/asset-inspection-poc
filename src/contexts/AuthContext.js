import React, { createContext, useState, useEffect } from 'react';
import { initAuth } from '../services/firebase';
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => { initAuth(setUser); }, []);
  if (!user) return <div>Authenticating...</div>;
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

