import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-6">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <span className="text-3xl">🏥</span>
        <h1 className="text-2xl font-bold">
          JasPharmacy
        </h1>
      </div>

      {/* Navigation */}

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="hover:bg-blue-700 p-3 rounded-lg transition"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/doctors"
          className="hover:bg-blue-700 p-3 rounded-lg transition"
        >
          👨‍⚕️ Doctors
        </Link>

        <Link
          to="/appointments"
          className="hover:bg-blue-700 p-3 rounded-lg transition"
        >
          📅 Appointments
        </Link>

        <Link
          to="/medicines"
          className="hover:bg-blue-700 p-3 rounded-lg transition"
        >
          💊 Medicines
        </Link>

        <Link
          to="/profile"
          className="hover:bg-blue-700 p-3 rounded-lg transition"
        >
          👤 Profile
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;