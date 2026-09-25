import Badge from "../ui/Badge";
import StatusBadge from "../ui/StatusBadge";
import Button from "../ui/Button";

function DoctorCard({ doctor, onBook, onEdit, onDelete, showActions = "user" }) {
  const initials = doctor.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-purple-50 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate">{doctor.name}</h3>
          <p className="text-sm text-purple-600 font-medium">{doctor.specialization}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400">{doctor.experience}</span>
            {doctor.rating && (
              <span className="text-xs text-yellow-600 font-semibold">⭐ {doctor.rating}</span>
            )}
          </div>
        </div>
        <StatusBadge status={doctor.status} />
      </div>
      {doctor.bio && <p className="text-xs text-gray-500 mb-4 line-clamp-2">{doctor.bio}</p>}
      <div className="flex gap-2">
        {showActions === "user" && (
          <Button variant="primary" size="sm" onClick={() => onBook?.(doctor)} className="flex-1">
            Book Appointment
          </Button>
        )}
        {showActions === "admin" && (
          <>
            <Button variant="secondary" size="sm" onClick={() => onEdit?.(doctor)} className="flex-1">✏️ Edit</Button>
            <Button variant="danger" size="sm" onClick={() => onDelete?.(doctor.id)}>🗑️</Button>
          </>
        )}
      </div>
    </div>
  );
}
export default DoctorCard;