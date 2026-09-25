import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { MOCK_PATIENTS } from "../../data/mockData";

const STATUS_FLOW = {
  Pending: { next: "Reviewing", label: "Start Reviewing", icon: "🔍" },
  Reviewing: { next: "Preparing", label: "Start Preparing", icon: "⚗️" },
  Preparing: { next: "Ready", label: "Mark as Ready", icon: "✅" },
  Ready: { next: "Completed", label: "Complete Request", icon: "🎉" },
  Completed: { next: null, label: "Completed", icon: "✅" },
};

function PrescriptionViewer() {
  const { id } = useParams();
  const { prescriptions, updatePrescriptionStatus } = useApp();
  const navigate = useNavigate();

  const rx = prescriptions.find((p) => p.id === id);
  const patient = MOCK_PATIENTS.find((p) => p.id === rx?.patientId);

  if (!rx) return (
    <AdminLayout>
      <div className="text-center py-20 text-gray-400">
        <div className="text-5xl mb-3">📋</div>
        <p>Prescription not found</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate("/admin/prescriptions")}>← Back</Button>
      </div>
    </AdminLayout>
  );

  const flow = STATUS_FLOW[rx.status] || STATUS_FLOW.Completed;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/admin/prescriptions")} className="text-gray-400 hover:text-gray-600 text-sm">← Back</button>
          <h1 className="text-2xl font-bold text-gray-900">Prescription Viewer</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Prescription Image/Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-purple-50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Prescription</h2>
                <span className="text-xs text-gray-400">{rx.fileName}</span>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl h-72 flex flex-col items-center justify-center border border-purple-100">
                <div className="text-6xl mb-3">{rx.fileType === "pdf" ? "📄" : "🖼️"}</div>
                <p className="font-semibold text-gray-700">{rx.fileName}</p>
                <p className="text-sm text-gray-400 mt-1">{rx.fileSize}</p>
                <p className="text-xs text-gray-400 mt-2">
                  (In production, the actual file will be displayed here)
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            {/* Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-purple-50 p-5">
              <h3 className="font-bold text-gray-900 mb-3">Request Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Request ID</span>
                  <span className="font-bold">{rx.requestId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <StatusBadge status={rx.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">{rx.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium">{rx.time}</span>
                </div>
              </div>
            </div>

            {/* Patient */}
            <div className="bg-white rounded-2xl shadow-sm border border-purple-50 p-5">
              <h3 className="font-bold text-gray-900 mb-3">Patient Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-bold">{rx.patientName}</span>
                </div>
                {patient && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Age</span>
                      <span className="font-medium">{patient.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone</span>
                      <span className="font-medium">{patient.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Blood Group</span>
                      <span className="font-medium">{patient.bloodGroup}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Notes */}
            {rx.notes && (
              <div className="bg-yellow-50 rounded-2xl border border-yellow-100 p-4">
                <p className="text-xs font-semibold text-yellow-700 mb-1">📝 Patient Notes</p>
                <p className="text-sm text-yellow-800">{rx.notes}</p>
              </div>
            )}

            {/* Action */}
            {flow.next && (
              <Button
                variant="primary"
                className="w-full"
                onClick={() => updatePrescriptionStatus(rx.id, flow.next)}
              >
                {flow.icon} {flow.label}
              </Button>
            )}
            {!flow.next && (
              <div className="bg-green-50 rounded-2xl border border-green-100 p-4 text-center">
                <p className="text-green-700 font-semibold text-sm">✅ Request Completed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default PrescriptionViewer;