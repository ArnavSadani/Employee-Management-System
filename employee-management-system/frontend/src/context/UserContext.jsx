// src/context/AuthContext.jsx
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(null);      
  const [userId, setUserId] = useState(null);    
  const [token, setToken] = useState(null);      

  const login = (email, userId, token) => {
    setEmail(email);
    setUserId(userId);
    setToken(token);

    // Persist in localStorage
    localStorage.setItem("email", email);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setEmail(null);
    setUserId(null);
    setToken(null);

    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ email, userId, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);


