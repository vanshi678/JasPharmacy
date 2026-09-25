import { createContext, useContext, useEffect, useState } from "react";
import { MOCK_MEDICINES } from "../data/mockData";

export const MedicineContext = createContext();

export function MedicineProvider({ children }) {
  const [medicines, setMedicines] = useState(() => {
    const saved = localStorage.getItem("medicines");
    return saved ? JSON.parse(saved) : MOCK_MEDICINES;
  });

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }, [medicines]);

  const addMedicine = (medicine) => {
    const newMed = { ...medicine, id: `m${Date.now()}` };
    setMedicines((prev) => [...prev, newMed]);
  };

  const updateMedicine = (id, updates) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const deleteMedicine = (id) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const getStockStatus = (medicine) => {
    const expiry = new Date(medicine.expiryDate);
    const today = new Date();
    if (expiry < today) return "Expired";
    if (medicine.quantity === 0) return "Out of Stock";
    if (medicine.quantity < 20) return "Low Stock";
    return "In Stock";
  };

  return (
    <MedicineContext.Provider
      value={{ medicines, setMedicines, addMedicine, updateMedicine, deleteMedicine, getStockStatus }}
    >
      {children}
    </MedicineContext.Provider>
  );
}

export function useMedicines() {
  return useContext(MedicineContext);
}