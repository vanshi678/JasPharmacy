// authService.js
// Replace mock logic with real API calls when backend is ready
// e.g. POST /api/auth/login

import { MOCK_USERS } from "../data/mockData";

export const authService = {
  login: async (email, password) => {
    // TODO: replace with -> const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  },

  register: async (userData) => {
    // TODO: replace with -> POST /api/auth/register
    return { success: true, message: "Registration successful" };
  },
};