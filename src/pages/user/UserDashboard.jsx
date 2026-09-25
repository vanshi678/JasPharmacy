import { useNavigate } from "react-router-dom";
import UserLayout from "../../components/layout/UserLayout";
import StatCard from "../../components/shared/StatCard";
import AppointmentCard from "../../components/shared/AppointmentCard";
import { useAuth } from "../../context/AuthContext";
import { useAppointments } from "../../context/AppointmentContext";
import { useApp } from "../../context/AppContext";

const quickActions = [
  { icon: "👨‍⚕️", label: "Find Doctor", path: "/user/doctors", color: "from-purple-100 to-purple-50", text: "text-purple-700" },
  { icon: "📅", label: "Book Appointment", path: "/user/appointments", color: "from-indigo-100 to-indigo-50", text: "text-indigo-700" },
  { icon: "📋", label: "Upload Prescription", path: "/user/prescriptions", color: "from-pink-100 to-pink-50", text: "text-pink-700" },
  { icon: "💊", label: "Order Medicine", path: "/user/medicines", color: "from-teal-100 to-teal-50", text: "text-teal-700" },
];

function UserDashboard() {
  const { currentUser } = useAuth();
  const { appointments } = useAppointments();
  const { prescriptions } = useApp();
  const navigate = useNavigate();

  const myAppointments = appointments.filter((a) => a.patientId === currentUser?.id);
  const upcoming = myAppointments.filter((a) => a.status === "Upcoming" || a.status === "Confirmed");
  const myPrescriptions = prescriptions.filter((p) => p.patientId === currentUser?.id);

  return (
    <UserLayout>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-6 md:p-8 mb-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-20 text-9xl leading-none">💊</div>
        <div className="relative z-10">
          <p className="text-purple-200 text-sm mb-1">Good morning,</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentUser?.name || "Patient"} 👋</h1>
          <p className="text-purple-100 text-sm max-w-md">
            Stay on top of your health. You have {upcoming.length} upcoming appointment{upcoming.length !== 1 ? "s" : ""}.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Appointments" value={myAppointments.length} icon="📅" color="purple" />
        <StatCard title="Prescriptions" value={myPrescriptions.length} icon="📋" color="indigo" />
        <StatCard title="Upcoming" value={upcoming.length} icon="⏰" color="blue" />
        <StatCard title="Completed" value={myAppointments.filter(a => a.status === "Completed").length} icon="✅" color="green" />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 text-center hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md border border-white`}
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <p className={`text-xs font-semibold ${action.text}`}>{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Appointments</h2>
            <button onClick={() => navigate("/user/appointments")} className="text-sm text-purple-600 font-semibold hover:underline">View All</button>
          </div>
          {upcoming.length === 0 ? (
            <div className="bg-white rounded-2xl border border-purple-50 p-8 text-center text-gray-400">
              <div className="text-4xl mb-2">📅</div>
              <p className="text-sm">No upcoming appointments</p>
              <button onClick={() => navigate("/user/appointments")} className="mt-3 text-sm text-purple-600 font-semibold">Book one now →</button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.slice(0, 3).map((apt) => <AppointmentCard key={apt.id} appointment={apt} />)}
            </div>
          )}
        </div>

        {/* Recent Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Prescription Requests</h2>
            <button onClick={() => navigate("/user/requests")} className="text-sm text-purple-600 font-semibold hover:underline">View All</button>
          </div>
          {myPrescriptions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-purple-50 p-8 text-center text-gray-400">
              <div className="text-4xl mb-2">📋</div>
              <p className="text-sm">No prescription requests yet</p>
              <button onClick={() => navigate("/user/prescriptions")} className="mt-3 text-sm text-purple-600 font-semibold">Upload one →</button>
            </div>
          ) : (
            <div className="space-y-3">
              {myPrescriptions.slice(0, 3).map((rx) => (
                <div key={rx.id} className="bg-white rounded-2xl border border-purple-50 p-4 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{rx.requestId}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{rx.date} · {rx.fileName}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      rx.status === "Completed" ? "bg-green-100 text-green-700" :
                      rx.status === "Ready" ? "bg-purple-100 text-purple-700" :
                      rx.status === "Preparing" ? "bg-orange-100 text-orange-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>{rx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}

export default UserDashboard;