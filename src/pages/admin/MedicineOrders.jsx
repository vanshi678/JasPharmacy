import AdminLayout from "../../components/layout/AdminLayout";
import StatusBadge from "../../components/ui/StatusBadge";
import { useApp } from "../../context/AppContext";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

function MedicineOrders() {
  const { prescriptions, updatePrescriptionStatus } = useApp();
  const navigate = useNavigate();
  const orders = prescriptions.filter((p) => ["Reviewing", "Preparing", "Ready"].includes(p.status));

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medicine Orders</h1>
        <p className="text-gray-500 text-sm mt-1">Active prescription preparations</p>
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📦</div>
          <p>No active orders right now</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((rx) => (
            <div key={rx.id} className="bg-white rounded-2xl shadow-sm border border-purple-50 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{rx.requestId}</h3>
                    <StatusBadge status={rx.status} />
                  </div>
                  <p className="text-sm text-purple-600 font-medium">{rx.patientName}</p>
                  <p className="text-xs text-gray-400">{rx.date} · {rx.fileName}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="primary" size="sm" onClick={() => navigate(`/admin/prescriptions/${rx.id}`)}>👁️ View</Button>
                {rx.status === "Reviewing" && <Button variant="secondary" size="sm" onClick={() => updatePrescriptionStatus(rx.id, "Preparing")}>⚗️ Start Preparing</Button>}
                {rx.status === "Preparing" && <Button variant="secondary" size="sm" onClick={() => updatePrescriptionStatus(rx.id, "Ready")}>✅ Mark Ready</Button>}
                {rx.status === "Ready" && <Button variant="secondary" size="sm" onClick={() => updatePrescriptionStatus(rx.id, "Completed")}>🎉 Complete</Button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default MedicineOrders;