import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { DoctorProvider } from "./context/DoctorContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { MedicineProvider } from "./context/MedicineContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <DoctorProvider>
          <AppointmentProvider>
            <MedicineProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </MedicineProvider>
          </AppointmentProvider>
        </DoctorProvider>
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);