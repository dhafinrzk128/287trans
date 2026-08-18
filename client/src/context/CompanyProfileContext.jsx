import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import api from "../api/client";
import { getPrerenderedData, setPrerenderedData } from "../utils/prerenderData";

const CompanyProfileContext = createContext(null);
const KEY = "profile";

export function CompanyProfileProvider({ children }) {
  const hadInitialData = useRef(getPrerenderedData(KEY) !== undefined).current;
  const [profile, setProfile] = useState(() => getPrerenderedData(KEY) ?? null);
  const [loading, setLoading] = useState(!hadInitialData);

  // silent: skip the loading=true flash for the first load when prerendered
  // data already matches what's on screen — an explicit refresh() (e.g. after
  // saving changes in the admin panel) should still show a loading state.
  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const { data } = await api.get("/profile");
      setProfile(data);
      setPrerenderedData(KEY, data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(hadInitialData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CompanyProfileContext.Provider value={{ profile, loading, refresh: () => load(false) }}>
      {children}
    </CompanyProfileContext.Provider>
  );
}

export function useCompanyProfile() {
  const ctx = useContext(CompanyProfileContext);
  if (!ctx) throw new Error("useCompanyProfile harus digunakan di dalam CompanyProfileProvider");
  return ctx;
}
