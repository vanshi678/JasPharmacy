import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import SearchBar from "../../components/ui/SearchBar";
import StatusBadge from "../../components/ui/StatusBadge";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { useMedicines } from "../../context/MedicineContext";

const EMPTY_FORM = { medicineName: "", category: "Tablet", quantity: "", price: "", expiryDate: "" };
const CATEGORIES = ["Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops"];

function MedicineInventory() {
  const { medicines, addMedicine, updateMedicine, deleteMedicine, getStockStatus } = useMedicines();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = medicines.filter((m) => {
    const matchSearch = m.medicineName.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase());
    const status = getStockStatus(m);
    const matchStatus = filterStatus === "All" || status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => { setForm(EMPTY_FORM); setModal("add"); };
  const openEdit = (med) => { setForm({ ...med }); setEditTarget(med); setModal("edit"); };
  const closeModal = () => { setModal(null); setEditTarget(null); };

  const handleSave = () => {
    if (modal === "add") addMedicine(form);
    else updateMedicine(editTarget.id, form);
    closeModal();
  };

  const statusFilters = ["All", "In Stock", "Low Stock", "Out of Stock", "Expired"];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medicine Inventory</h1>
          <p className="text-gray-500 text-sm mt-1">{medicines.length} total medicines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => window.location.href = "/admin/scan"}>📷 Scan Medicine</Button>
          <Button variant="primary" size="sm" onClick={openAdd}>+ Add Medicine</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search medicines..." /></div>
        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((f) => (
            <button key={f} onClick={() => setFilterStatus(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterStatus === f ? "bg-purple-600 text-white" : "bg-white text-gray-600 border border-purple-100 hover:border-purple-300"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table - desktop */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-purple-50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-purple-50 text-xs text-gray-500 uppercase">
              <th className="text-left px-6 py-4">Medicine Name</th>
              <th className="text-left px-6 py-4">Category</th>
              <th className="text-left px-6 py-4">Quantity</th>
              <th className="text-left px-6 py-4">Price</th>
              <th className="text-left px-6 py-4">Expiry</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((med) => (
              <tr key={med.id} className="hover:bg-purple-50/30 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{med.medicineName}</td>
                <td className="px-6 py-4 text-gray-600">{med.category}</td>
                <td className="px-6 py-4 font-medium">{med.quantity}</td>
                <td className="px-6 py-4 text-gray-600">₹{med.price}</td>
                <td className="px-6 py-4 text-gray-500">{med.expiryDate}</td>
                <td className="px-6 py-4"><StatusBadge status={getStockStatus(med)} /></td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(med)} className="text-purple-600 hover:text-purple-800 font-medium text-xs bg-purple-50 px-3 py-1.5 rounded-lg">Edit</button>
                    <button onClick={() => deleteMedicine(med.id)} className="text-red-500 hover:text-red-700 font-medium text-xs bg-red-50 px-3 py-1.5 rounded-lg">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">💊</div>
            <p>No medicines found</p>
          </div>
        )}
      </div>

      {/* Cards - mobile */}
      <div className="md:hidden space-y-3">
        {filtered.map((med) => (
          <div key={med.id} className="bg-white rounded-2xl border border-purple-50 p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-900 text-sm">{med.medicineName}</h3>
              <StatusBadge status={getStockStatus(med)} />
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-500 mb-3">
              <span>Category: {med.category}</span>
              <span>Qty: {med.quantity}</span>
              <span>Price: ₹{med.price}</span>
              <span>Expiry: {med.expiryDate}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(med)} className="flex-1 text-xs bg-purple-50 text-purple-600 font-medium py-2 rounded-lg">Edit</button>
              <button onClick={() => deleteMedicine(med.id)} className="flex-1 text-xs bg-red-50 text-red-500 font-medium py-2 rounded-lg">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={!!modal} onClose={closeModal} title={modal === "add" ? "Add Medicine" : "Edit Medicine"}>
        <div className="space-y-4">
          {[
            { label: "Medicine Name", key: "medicineName", type: "text" },
            { label: "Price (₹)", key: "price", type: "number" },
            { label: "Quantity", key: "quantity", type: "number" },
            { label: "Expiry Date", key: "expiryDate", type: "date" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
              <input type={field.type} value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <Button variant="primary" className="w-full" onClick={handleSave} disabled={!form.medicineName || !form.quantity}>
            {modal === "add" ? "Add Medicine" : "Save Changes"}
          </Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}

export default MedicineInventory;