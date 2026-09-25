import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import UserDoctors from "./pages/user/UserDoctors";
import UserAppointments from "./pages/user/UserAppointments";
import UserMedicines from "./pages/user/UserMedicines";
import UploadPrescription from "./pages/user/UploadPrescription";
import MyRequests from "./pages/user/MyRequests";
import UserNotifications from "./pages/user/UserNotifications";
import UserProfile from "./pages/user/UserProfile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import MedicineInventory from "./pages/admin/MedicineInventory";
import ScanMedicine from "./pages/admin/ScanMedicine";
import PrescriptionRequests from "./pages/admin/PrescriptionRequests";
import PrescriptionViewer from "./pages/admin/PrescriptionViewer";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";
import MedicineOrders from "./pages/admin/MedicineOrders";

function ProtectedRoute({ children, requiredRole }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return (
      <Navigate
        to={currentUser.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/doctors"
        element={
          <ProtectedRoute requiredRole="user">
            <UserDoctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/appointments"
        element={
          <ProtectedRoute requiredRole="user">
            <UserAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/medicines"
        element={
          <ProtectedRoute requiredRole="user">
            <UserMedicines />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/prescriptions"
        element={
          <ProtectedRoute requiredRole="user">
            <UploadPrescription />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/requests"
        element={
          <ProtectedRoute requiredRole="user">
            <MyRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/notifications"
        element={
          <ProtectedRoute requiredRole="user">
            <UserNotifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/profile"
        element={
          <ProtectedRoute requiredRole="user">
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/inventory"
        element={
          <ProtectedRoute requiredRole="admin">
            <MedicineInventory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/scan"
        element={
          <ProtectedRoute requiredRole="admin">
            <ScanMedicine />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/prescriptions"
        element={
          <ProtectedRoute requiredRole="admin">
            <PrescriptionRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/prescriptions/:id"
        element={
          <ProtectedRoute requiredRole="admin">
            <PrescriptionViewer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute requiredRole="admin">
            <MedicineOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/doctors"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDoctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/patients"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPatients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/appointments"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminNotifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminSettings />
          </ProtectedRoute>
        }
      />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;