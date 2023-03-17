import React, { createContext, useState, useEffect, useContext } from "react";
import AuthService from "../services/AuthService";
import {firebaseAuth} from "../services/AuthService";
export const AuthContext = createContext();

export const useAuth=()=>{
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
    await AuthService.login(email, password);
  };

  const logout = async () => {
    await AuthService.logout();
  };

  const signup = async (email, password) => {
    await AuthService.signup(email, password);
  };

  const resetPassword = async (email) => {
    await AuthService.resetPassword(email);
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
