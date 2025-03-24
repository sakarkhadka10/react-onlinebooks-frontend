import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const getUser = import.meta.env.VITE_SECRET_KEY_URI;
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Fetch User Based On Token
  const fetchUserDetails = async (token) => {
    setIsAuthLoading(true);
    try {
      const response = await fetch(`${getUser}/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error Fetching User:", error);
      localStorage.removeItem("token");
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserDetails(token);
    } else {
      setIsAuthLoading(false);
    }
  }, []);

  // Login function to set token and fetch user
  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUserDetails(token);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isAuthLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
