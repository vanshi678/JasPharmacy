import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import SearchBar from "../../components/ui/SearchBar";
import StatusBadge from "../../components/ui/StatusBadge";
import { MOCK_PATIENTS } from "../../data/mockData";

function AdminPatients() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = MOCK_PATIENTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search);
    const matchFilter = filter === "All" || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <p className="text-gray-500 text-sm mt-1">{MOCK_PATIENTS.length} registered patients</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search patients..." /></div>
        <div className="flex gap-2">
          {["All", "Active", "Inactive"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-purple-600 text-white" : "bg-white text-gray-600 border border-purple-100"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-purple-50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-purple-50 text-xs text-gray-500 uppercase">
              {["Patient", "Age", "Gender", "Phone", "Blood Group", "Last Visit", "Status"].map((h) => (
                <th key={h} className="text-left px-6 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-purple-50/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                      {p.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{p.age}</td>
                <td className="px-6 py-4 text-gray-600">{p.gender}</td>
                <td className="px-6 py-4 text-gray-600">{p.phone}</td>
                <td className="px-6 py-4 font-medium">{p.bloodGroup}</td>
                <td className="px-6 py-4 text-gray-500">{p.lastVisit}</td>
                <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-purple-50 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                {p.name[0]}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-400">{p.email}</p>
              </div>
              <StatusBadge status={p.status} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
              <span>Age: {p.age} · {p.gender}</span>
              <span>📞 {p.phone}</span>
              <span>🩸 {p.bloodGroup}</span>
              <span>Last: {p.lastVisit}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">👥</div>
          <p>No patients found</p>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminPatients;