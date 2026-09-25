import { createContext, useContext, useState } from "react";
import { MOCK_USERS } from "../data/mockData";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("jaspharmacy_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const safeUser = { ...user };
      delete safeUser.password;
      setCurrentUser(safeUser);
      localStorage.setItem("jaspharmacy_user", JSON.stringify(safeUser));
      return { success: true, user: safeUser };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("jaspharmacy_user");
  };

  const updateProfile = (updates) => {
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    localStorage.setItem("jaspharmacy_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}