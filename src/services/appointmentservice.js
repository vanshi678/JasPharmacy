// appointmentService.js
// TODO: GET/POST/PUT/DELETE /api/appointments

export const appointmentService = {
  getAll: async () => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  },
  book: async (appointment) => {
    return { success: true };
  },
  update: async (id, data) => {
    return { success: true };
  },
};