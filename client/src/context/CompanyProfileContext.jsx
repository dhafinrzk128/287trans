import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/client";

const CompanyProfileContext = createContext(null);

export function CompanyProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/profile");
      setProfile(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <CompanyProfileContext.Provider value={{ profile, loading, refresh }}>
      {children}
    </CompanyProfileContext.Provider>
  );
}

export function useCompanyProfile() {
  const ctx = useContext(CompanyProfileContext);
  if (!ctx) throw new Error("useCompanyProfile harus digunakan di dalam CompanyProfileProvider");
  return ctx;
}
