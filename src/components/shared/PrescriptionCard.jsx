import { useNavigate } from "react-router-dom";
import StatusBadge from "../ui/StatusBadge";
import Button from "../ui/Button";

const STEPS = ["Pending", "Reviewing", "Preparing", "Ready", "Completed"];

function PrescriptionCard({ prescription, role = "user", onUpdateStatus }) {
  const navigate = useNavigate();
  const currentStep = STEPS.indexOf(prescription.status);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-purple-50 p-5 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-2xl flex-shrink-0">
            {prescription.fileType === "pdf" ? "📄" : "🖼️"}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-bold text-gray-900 text-sm">
                {prescription.requestId}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {prescription.date} · {prescription.time}
            </p>
          </div>
        </div>
        <StatusBadge status={prescription.status} />
      </div>

      {/* File Info */}
      <div className="bg-purple-50 rounded-xl p-3 mb-4">
        <p className="text-xs font-semibold text-purple-700 mb-0.5">
          📎 {prescription.fileName}
        </p>
        <p className="text-xs text-purple-400">{prescription.fileSize}</p>
      </div>

      {/* Patient name — show for admin */}
      {role === "admin" && (
        <div className="mb-4">
          <p className="text-xs text-gray-500">Patient</p>
          <p className="text-sm font-semibold text-gray-900">
            {prescription.patientName}
          </p>
        </div>
      )}

      {/* Notes */}
      {prescription.notes && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 mb-4">
          <p className="text-xs text-yellow-700">
            📝 {prescription.notes}
          </p>
        </div>
      )}

      {/* Status progress bar — for user view */}
      {role === "user" && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs font-semibold text-purple-600">
              {Math.round(((currentStep + 1) / STEPS.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${((currentStep + 1) / STEPS.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            {STEPS.map((step, i) => (
              <span
                key={step}
                className={`text-xs ${
                  i <= currentStep
                    ? "text-purple-600 font-semibold"
                    : "text-gray-300"
                }`}
              >
                {i === 0 ? "Pending" : i === STEPS.length - 1 ? "Done" : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {role === "admin" && (
          <>
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() =>
                navigate(`/admin/prescriptions/${prescription.id}`)
              }
            >
              👁️ View
            </Button>
            {prescription.status === "Pending" && onUpdateStatus && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onUpdateStatus(prescription.id, "Reviewing")}
              >
                🔍 Review
              </Button>
            )}
            {prescription.status === "Reviewing" && onUpdateStatus && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onUpdateStatus(prescription.id, "Preparing")}
              >
                ⚗️ Prepare
              </Button>
            )}
            {prescription.status === "Preparing" && onUpdateStatus && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onUpdateStatus(prescription.id, "Ready")}
              >
                ✅ Ready
              </Button>
            )}
          </>
        )}
        {role === "user" && (
          <div
            className={`w-full text-center text-xs font-semibold py-2 rounded-xl ${
              prescription.status === "Completed"
                ? "bg-green-100 text-green-700"
                : prescription.status === "Ready"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {prescription.status === "Completed"
              ? "✅ Request completed — collect from pharmacy"
              : prescription.status === "Ready"
              ? "🎉 Your medicine is ready for pickup!"
              : prescription.status === "Preparing"
              ? "⚗️ Pharmacist is preparing your medicine..."
              : prescription.status === "Reviewing"
              ? "🔍 Prescription is being reviewed..."
              : "⏳ Waiting for pharmacist review..."}
          </div>
        )}
      </div>
    </div>
  );
}

export default PrescriptionCard;