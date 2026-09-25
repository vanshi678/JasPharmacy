import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import SearchBar from "../../components/ui/SearchBar";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import { useAppointments } from "../../context/AppointmentContext";

function AdminAppointments() {
  const { appointments, updateAppointment } = useAppointments();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = appointments.filter((a) => {
    const matchSearch = a.patientName.toLowerCase().includes(search.toLowerCase()) || a.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <p className="text-gray-500 text-sm mt-1">{appointments.length} total appointments</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search appointments..." /></div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Upcoming", "Confirmed", "Completed", "Cancelled"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-purple-600 text-white" : "bg-white text-gray-600 border border-purple-100"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-purple-50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-purple-50 text-xs text-gray-500 uppercase">
              {["Patient", "Doctor", "Date", "Time", "Reason", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-6 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((apt) => (
              <tr key={apt.id} className="hover:bg-purple-50/30">
                <td className="px-6 py-4 font-semibold text-gray-900">{apt.patientName}</td>
                <td className="px-6 py-4 text-gray-600">{apt.doctorName}</td>
                <td className="px-6 py-4 text-gray-500">{apt.appointmentDate}</td>
                <td className="px-6 py-4 text-gray-500">{apt.appointmentTime || "—"}</td>
                <td className="px-6 py-4 text-gray-400 text-xs max-w-xs truncate">{apt.reason || "—"}</td>
                <td className="px-6 py-4"><StatusBadge status={apt.status} /></td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {apt.status === "Upcoming" && (
                      <button onClick={() => updateAppointment(apt.id, { status: "Confirmed" })}
                        className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-lg font-medium hover:bg-purple-100">Confirm</button>
                    )}
                    {apt.status !== "Completed" && apt.status !== "Cancelled" && (
                      <button onClick={() => updateAppointment(apt.id, { status: "Cancelled" })}
                        className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-lg font-medium hover:bg-red-100">Cancel</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {filtered.map((apt) => (
          <div key={apt.id} className="bg-white rounded-2xl border border-purple-50 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold text-gray-900 text-sm">{apt.patientName}</p>
                <p className="text-purple-600 text-xs">{apt.doctorName}</p>
              </div>
              <StatusBadge status={apt.status} />
            </div>
            <div className="text-xs text-gray-500 mb-3">📅 {apt.appointmentDate} · 🕐 {apt.appointmentTime || "TBD"}</div>
            <div className="flex gap-2">
              {apt.status === "Upcoming" && (
                <button onClick={() => updateAppointment(apt.id, { status: "Confirmed" })}
                  className="flex-1 text-xs bg-purple-50 text-purple-600 py-2 rounded-lg font-medium">Confirm</button>
              )}
              {apt.status !== "Completed" && apt.status !== "Cancelled" && (
                <button onClick={() => updateAppointment(apt.id, { status: "Cancelled" })}
                  className="flex-1 text-xs bg-red-50 text-red-500 py-2 rounded-lg font-medium">Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📅</div>
          <p>No appointments found</p>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminAppointments;