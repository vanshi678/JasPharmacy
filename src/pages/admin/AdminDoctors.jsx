import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import DoctorCard from "../../components/shared/DoctorCard";
import SearchBar from "../../components/ui/SearchBar";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { useDoctors } from "../../context/DoctorContext";

const EMPTY = { name: "", specialization: "", experience: "", status: "Available", bio: "", phone: "", email: "" };

function AdminDoctors() {
  const { doctors, addDoctor, updateDoctor, deleteDoctor } = useDoctors();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const filtered = doctors.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(EMPTY); setModal("add"); };
  const openEdit = (doc) => { setForm({ ...doc }); setEditTarget(doc); setModal("edit"); };
  const close = () => { setModal(null); setEditTarget(null); };

  const handleSave = () => {
    if (modal === "add") addDoctor(form);
    else updateDoctor(editTarget.id, form);
    close();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-500 text-sm mt-1">{doctors.length} registered doctors</p>
        </div>
        <Button variant="primary" size="sm" onClick={openAdd}>+ Add Doctor</Button>
      </div>

      <div className="mb-6 max-w-sm"><SearchBar value={search} onChange={setSearch} placeholder="Search doctors..." /></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} showActions="admin" onEdit={openEdit} onDelete={deleteDoctor} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">👨‍⚕️</div>
          <p>No doctors found</p>
        </div>
      )}

      <Modal isOpen={!!modal} onClose={close} title={modal === "add" ? "Add Doctor" : "Edit Doctor"}>
        <div className="space-y-4">
          {[
            { label: "Full Name", key: "name" },
            { label: "Specialization", key: "specialization" },
            { label: "Experience (e.g. 5 years)", key: "experience" },
            { label: "Phone", key: "phone" },
            { label: "Email", key: "email" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
              <input type="text" value={form[f.key] || ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm">
              <option>Available</option>
              <option>Busy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
            <textarea value={form.bio || ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm resize-none" />
          </div>
          <Button variant="primary" className="w-full" onClick={handleSave} disabled={!form.name}>{modal === "add" ? "Add Doctor" : "Save Changes"}</Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}

export default AdminDoctors;