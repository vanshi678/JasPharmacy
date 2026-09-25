import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

function AdminSettings() {
  const { currentUser, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your admin profile and preferences</p>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4">
            ✅ Settings saved!
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-purple-50 p-6 mb-4">
          <h2 className="font-bold text-gray-900 mb-4">Admin Profile</h2>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-purple-50">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {currentUser?.name?.[0] || "A"}
            </div>
            <div>
              <p className="font-bold text-gray-900">{currentUser?.name}</p>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">Administrator</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Full Name", key: "name", type: "text" },
              { label: "Email", key: "email", type: "email" },
              { label: "Phone", key: "phone", type: "tel" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm" />
              </div>
            ))}
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-purple-50 p-6">
          <h2 className="font-bold text-gray-900 mb-4">App Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>App Name</span><span className="font-medium">JasPharmacy</span></div>
            <div className="flex justify-between text-gray-600"><span>Version</span><span className="font-medium">1.0.0</span></div>
            <div className="flex justify-between text-gray-600"><span>Mode</span><span className="font-medium text-orange-500">Frontend Mock (No Backend)</span></div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminSettings;