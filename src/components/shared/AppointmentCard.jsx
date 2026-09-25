import StatusBadge from "../ui/StatusBadge";

function AppointmentCard({ appointment }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-purple-50 p-5 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">{appointment.patientName}</h3>
          <p className="text-purple-600 text-xs font-medium mt-0.5">{appointment.doctorName}</p>
        </div>
        <StatusBadge status={appointment.status} />
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>📅 {appointment.appointmentDate}</span>
        <span>🕐 {appointment.appointmentTime || "TBD"}</span>
      </div>
      {appointment.reason && (
        <p className="text-xs text-gray-400 mt-2 line-clamp-1">📝 {appointment.reason}</p>
      )}
    </div>
  );
}
export default AppointmentCard;