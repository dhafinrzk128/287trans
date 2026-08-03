import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("adminUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (username, password) => {
    const { data } = await api.post("/auth/login", { username, password });
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminUser", JSON.stringify(data.admin));
    setAdmin(data.admin);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setAdmin(null);
  }, []);

  const isAuthenticated = Boolean(admin && localStorage.getItem("adminToken"));

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus digunakan di dalam AuthProvider");
  return ctx;
}
