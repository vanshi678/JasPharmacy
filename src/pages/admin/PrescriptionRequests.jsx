import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import StatusBadge from "../../components/ui/StatusBadge";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";

function PrescriptionRequests() {
  const { prescriptions, updatePrescriptionStatus } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const filtered = prescriptions.filter((p) => {
    const matchSearch = p.patientName.toLowerCase().includes(search.toLowerCase()) || p.requestId.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.status === filter;
    return matchSearch && matchFilter;
  });

  const filters = ["All", "Pending", "Reviewing", "Preparing", "Ready", "Completed"];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescription Requests</h1>
          <p className="text-gray-500 text-sm mt-1">{prescriptions.filter(p => p.status === "Pending").length} pending requests</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search by patient or request ID..." /></div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-purple-600 text-white" : "bg-white text-gray-600 border border-purple-100"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((rx) => (
          <div key={rx.id} className="bg-white rounded-2xl shadow-sm border border-purple-50 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">{rx.requestId}</span>
                  <StatusBadge status={rx.status} />
                </div>
                <p className="text-sm text-purple-600 font-medium">{rx.patientName}</p>
                <p className="text-xs text-gray-400 mt-0.5">{rx.date} at {rx.time}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                {rx.fileType === "pdf" ? "📄" : "🖼️"}
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3">📎 {rx.fileName} ({rx.fileSize})</p>
            {rx.notes && <p className="text-xs text-gray-400 mb-3 bg-gray-50 p-2 rounded-lg">"{rx.notes}"</p>}

            <div className="flex gap-2">
              <Button variant="primary" size="sm" className="flex-1" onClick={() => navigate(`/admin/prescriptions/${rx.id}`)}>
                👁️ View Prescription
              </Button>
              {rx.status === "Pending" && (
                <Button variant="secondary" size="sm" onClick={() => updatePrescriptionStatus(rx.id, "Reviewing")}>
                  Review
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📋</div>
          <p>No prescription requests found</p>
        </div>
      )}
    </AdminLayout>
  );
}

export default PrescriptionRequests;