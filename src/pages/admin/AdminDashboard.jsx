import AdminLayout from "../../components/layout/AdminLayout";
import StatCard from "../../components/shared/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { useMedicines } from "../../context/MedicineContext";
import { useAppointments } from "../../context/AppointmentContext";
import { useApp } from "../../context/AppContext";
import { MOCK_PATIENTS } from "../../data/mockData";

function AdminDashboard() {
  const { medicines, getStockStatus } = useMedicines();
  const { appointments } = useAppointments();
  const { prescriptions } = useApp();

  const pendingPrescriptions = prescriptions.filter((p) => p.status === "Pending" || p.status === "Reviewing").length;
  const lowStock = medicines.filter((m) => getStockStatus(m) === "Low Stock" || getStockStatus(m) === "Out of Stock").length;
  const todayApts = appointments.filter((a) => a.appointmentDate === new Date().toISOString().split("T")[0]).length;
  const pendingOrders = prescriptions.filter((p) => p.status === "Preparing").length;

  const recentPrescriptions = prescriptions.slice(0, 4);
  const lowStockMeds = medicines.filter((m) => ["Low Stock", "Out of Stock", "Expired"].includes(getStockStatus(m)));

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of JasPharmacy operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <StatCard title="Total Medicines" value={medicines.length} icon="💊" color="purple" />
        <StatCard title="Pending Prescriptions" value={pendingPrescriptions} icon="📋" color="orange" />
        <StatCard title="Low Stock" value={lowStock} icon="⚠️" color="red" />
        <StatCard title="Today's Appointments" value={todayApts} icon="📅" color="blue" />
        <StatCard title="Pending Orders" value={pendingOrders} icon="📦" color="indigo" />
        <StatCard title="Total Patients" value={MOCK_PATIENTS.length} icon="👥" color="teal" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Prescriptions */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Prescription Requests</h2>
            <a href="/admin/prescriptions" className="text-xs text-purple-600 font-semibold hover:underline">View All</a>
          </div>
          <div className="space-y-3">
            {recentPrescriptions.map((rx) => (
              <div key={rx.id} className="flex items-center justify-between p-3 bg-purple-50/50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{rx.requestId}</p>
                  <p className="text-xs text-gray-500">{rx.patientName} · {rx.date}</p>
                </div>
                <StatusBadge status={rx.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Medicines */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Low Stock Alert</h2>
            <a href="/admin/inventory" className="text-xs text-purple-600 font-semibold hover:underline">View All</a>
          </div>
          {lowStockMeds.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">All medicines are well-stocked ✅</p>
          ) : (
            <div className="space-y-3">
              {lowStockMeds.map((med) => (
                <div key={med.id} className="flex items-center justify-between p-3 bg-red-50/50 rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{med.medicineName}</p>
                    <p className="text-xs text-gray-500">{med.category} · Qty: {med.quantity}</p>
                  </div>
                  <StatusBadge status={getStockStatus(med)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-sm border border-purple-50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Recent Appointments</h2>
          <a href="/admin/appointments" className="text-xs text-purple-600 font-semibold hover:underline">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 uppercase border-b border-gray-100">
                <th className="text-left pb-3">Patient</th>
                <th className="text-left pb-3">Doctor</th>
                <th className="text-left pb-3">Date</th>
                <th className="text-left pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.slice(0, 5).map((apt) => (
                <tr key={apt.id}>
                  <td className="py-3 font-medium text-gray-900">{apt.patientName}</td>
                  <td className="py-3 text-gray-600">{apt.doctorName}</td>
                  <td className="py-3 text-gray-500">{apt.appointmentDate}</td>
                  <td className="py-3"><StatusBadge status={apt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;