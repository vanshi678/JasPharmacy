import { Link, useLocation } from "react-router-dom";

const userNavItems = [
  { path: "/user/dashboard", icon: "🏠", label: "Home" },
  { path: "/user/doctors", icon: "👨‍⚕️", label: "Doctors" },
  { path: "/user/appointments", icon: "📅", label: "Appointments" },
  { path: "/user/prescriptions", icon: "📋", label: "Prescriptions" },
  { path: "/user/profile", icon: "👤", label: "Profile" },
];

const adminNavItems = [
  { path: "/admin/dashboard", icon: "🏠", label: "Home" },
  { path: "/admin/inventory", icon: "💊", label: "Inventory" },
  { path: "/admin/prescriptions", icon: "📋", label: "Rx Requests" },
  { path: "/admin/patients", icon: "👥", label: "Patients" },
  { path: "/admin/settings", icon: "⚙️", label: "Settings" },
];

function MobileNav({ role = "user" }) {
  const { pathname } = useLocation();
  const items = role === "admin" ? adminNavItems : userNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-purple-100 shadow-lg lg:hidden">
      <div className="flex items-center justify-around px-2 py-2 safe-bottom">
        {items.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                active
                  ? "text-purple-700"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span
                className={`text-xl leading-none transition-all duration-200 ${
                  active
                    ? "scale-110"
                    : ""
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`text-xs font-medium truncate w-full text-center ${
                  active ? "text-purple-700" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-purple-600 mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNav;