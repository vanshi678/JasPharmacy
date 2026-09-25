// doctorService.js
// TODO: GET/POST/PUT/DELETE /api/doctors

export const doctorService = {
  getAll: async () => {
    const saved = localStorage.getItem("doctors");
    return saved ? JSON.parse(saved) : [];
  },
  add: async (doctor) => {
    return { success: true };
  },
  update: async (id, data) => {
    return { success: true };
  },
  delete: async (id) => {
    return { success: true };
  },
};