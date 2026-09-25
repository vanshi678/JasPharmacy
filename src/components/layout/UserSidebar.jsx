import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { path: "/user/dashboard", icon: "🏠", label: "Dashboard" },
  { path: "/user/doctors", icon: "👨‍⚕️", label: "Doctors" },
  { path: "/user/appointments", icon: "📅", label: "Appointments" },
  { path: "/user/medicines", icon: "💊", label: "Medicines" },
  { path: "/user/prescriptions", icon: "📋", label: "Prescriptions" },
  { path: "/user/requests", icon: "📦", label: "My Requests" },
  { path: "/user/notifications", icon: "🔔", label: "Notifications" },
  { path: "/user/profile", icon: "👤", label: "Profile" },
];

function UserSidebar({ mobileOpen, onClose }) {
  const { pathname } = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">💊</div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">JasPharmacy</h1>
            <p className="text-purple-200 text-xs mt-0.5">Patient Portal</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              pathname === item.path
                ? "bg-white/20 text-white shadow-sm"
                : "text-purple-200 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
            {currentUser?.name?.[0] || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{currentUser?.name}</p>
            <p className="text-purple-300 text-xs truncate">{currentUser?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition-all text-sm"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-gradient-to-b from-purple-700 to-indigo-800 fixed top-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <aside className="relative w-72 flex flex-col bg-gradient-to-b from-purple-700 to-indigo-800 h-full">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
export default UserSidebar;