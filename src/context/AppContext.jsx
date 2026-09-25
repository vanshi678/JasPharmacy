import { createContext, useContext, useState } from "react";
import {
  MOCK_PRESCRIPTIONS,
  MOCK_NOTIFICATIONS,
} from "../data/mockData";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [prescriptions, setPrescriptions] = useState(
    () => JSON.parse(localStorage.getItem("prescriptions") || JSON.stringify(MOCK_PRESCRIPTIONS))
  );
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const addPrescription = (prescription) => {
    const updated = [...prescriptions, prescription];
    setPrescriptions(updated);
    localStorage.setItem("prescriptions", JSON.stringify(updated));
  };

  const updatePrescriptionStatus = (id, status) => {
    const updated = prescriptions.map((p) =>
      p.id === id ? { ...p, status } : p
    );
    setPrescriptions(updated);
    localStorage.setItem("prescriptions", JSON.stringify(updated));
  };

  const markNotificationRead = (role, id) => {
    setNotifications((prev) => ({
      ...prev,
      [role]: prev[role].map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        prescriptions,
        setPrescriptions,
        addPrescription,
        updatePrescriptionStatus,
        notifications,
        markNotificationRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}