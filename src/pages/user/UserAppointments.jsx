import { useState } from "react";
import UserLayout from "../../components/layout/UserLayout";
import StatusBadge from "../../components/ui/StatusBadge";
import SearchBar from "../../components/ui/SearchBar";
import { useAppointments } from "../../context/AppointmentContext";
import { useAuth } from "../../context/AuthContext";

const STATUS_STEPS = ["Upcoming", "Confirmed", "Completed"];

function UserAppointments() {
  const { appointments } = useAppointments();
  const { currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const myApts = appointments.filter((a) => a.patientId === currentUser?.id || a.patientName === currentUser?.name);
  const filtered = myApts.filter((a) => {
    const matchSearch = a.doctorName.toLowerCase().includes(search.toLowerCase()) || a.reason?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || a.status === filter;
    return matchSearch && matchFilter;
  });

  const filters = ["All", "Upcoming", "Confirmed", "Completed", "Cancelled"];

  return (
    <UserLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <p className="text-gray-500 text-sm mt-1">Track your scheduled and past appointments</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search appointments..." /></div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-purple-600 text-white" : "bg-white text-gray-600 border border-purple-100"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📅</div>
          <p>No appointments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((apt) => (
            <div key={apt.id} className="bg-white rounded-2xl shadow-sm border border-purple-50 p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {apt.doctorName.split(" ").pop()[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{apt.doctorName}</h3>
                    <p className="text-purple-600 text-sm">{apt.specialization}</p>
                  </div>
                </div>
                <StatusBadge status={apt.status} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-purple-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Date</p>
                  <p className="font-semibold text-gray-800">📅 {apt.appointmentDate}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Time</p>
                  <p className="font-semibold text-gray-800">🕐 {apt.appointmentTime || "TBD"}</p>
                </div>
                {apt.reason && (
                  <div className="bg-purple-50 rounded-xl p-3 col-span-2 md:col-span-1">
                    <p className="text-xs text-gray-500 mb-0.5">Reason</p>
                    <p className="font-medium text-gray-800 text-xs line-clamp-1">📝 {apt.reason}</p>
                  </div>
                )}
              </div>

              {/* Progress */}
              {apt.status !== "Cancelled" && (
                <div className="mt-4 pt-4 border-t border-purple-50">
                  <div className="flex items-center justify-between">
                    {STATUS_STEPS.map((step, i) => {
                      const currentIdx = STATUS_STEPS.indexOf(apt.status);
                      const done = i <= currentIdx;
                      return (
                        <div key={step} className="flex-1 flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full mb-1 ${done ? "bg-purple-600" : "bg-gray-200"}`} />
                          <span className={`text-xs ${done ? "text-purple-600 font-semibold" : "text-gray-400"}`}>{step}</span>
                          {i < STATUS_STEPS.length - 1 && (
                            <div className={`h-0.5 w-full mt-1.5 ${done && i < currentIdx ? "bg-purple-600" : "bg-gray-200"}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </UserLayout>
  );
}

export default UserAppointments;