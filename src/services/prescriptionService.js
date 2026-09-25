// prescriptionService.js
// TODO: Replace with real API calls -> GET/POST /api/prescriptions

export const prescriptionService = {
  getAll: async () => {
    const saved = localStorage.getItem("prescriptions");
    return saved ? JSON.parse(saved) : [];
  },
  submit: async (prescription) => {
    // TODO: POST /api/prescriptions
    return { success: true };
  },
  updateStatus: async (id, status) => {
    // TODO: PATCH /api/prescriptions/:id/status
    return { success: true };
  },
};