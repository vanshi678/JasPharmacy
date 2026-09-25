// medicineService.js
// TODO: Replace with real API calls -> GET/POST /api/medicines

export const medicineService = {
  getAll: async () => {
    const saved = localStorage.getItem("medicines");
    return saved ? JSON.parse(saved) : [];
  },
  add: async (medicine) => {
    // TODO: POST /api/medicines
    return { success: true };
  },
  update: async (id, data) => {
    // TODO: PUT /api/medicines/:id
    return { success: true };
  },
  delete: async (id) => {
    // TODO: DELETE /api/medicines/:id
    return { success: true };
  },
};