import React, { createContext, useState, useEffect, useContext } from "react";
import { firebaseAuth, login as serviceLogin, logout as serviceLogout, signup as serviceSignup, resetPassword as serviceResetPassword } from "../services/AuthService";
export const AuthContext = createContext();

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);


  const login = async (email, password) => {
    await serviceLogin(email, password);
  };

  const logout = async () => {
    await serviceLogout();
  };

  const signup = async (email, password) => {
    await serviceSignup(email, password);
  };

  const resetPassword = async (email) => {
    await serviceResetPassword(email);
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
    useAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
