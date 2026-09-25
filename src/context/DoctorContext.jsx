import { createContext, useContext, useEffect, useState } from "react";
import { MOCK_DOCTORS } from "../data/mockData";

export const DoctorContext = createContext();

export function DoctorProvider({ children }) {
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem("doctors");
    return saved ? JSON.parse(saved) : MOCK_DOCTORS;
  });

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  const addDoctor = (doctor) => {
    const newDoc = { ...doctor, id: `d${Date.now()}`, rating: 4.5 };
    setDoctors((prev) => [...prev, newDoc]);
  };

  const updateDoctor = (id, updates) => {
    setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  const deleteDoctor = (id) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <DoctorContext.Provider value={{ doctors, setDoctors, addDoctor, updateDoctor, deleteDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctors() {
  return useContext(DoctorContext);
}