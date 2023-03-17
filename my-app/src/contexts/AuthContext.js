import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const login = async (email, password) => {
    await authService.login(email, password);
  };

  const logout = async () => {
    await authService.logout();
  };

  const signup = async (email, password) => {
    await authService.signup(email, password);
  };

  const resetPassword = async (email) => {
    await authService.resetPassword(email);
  };

  const updateEmail = async (email) => {
    await currentUser.updateEmail(email);
  };

  const updatePassword = async (password) => {
    await currentUser.updatePassword(password);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};