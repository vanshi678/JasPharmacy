import { useState } from "react";
import UserLayout from "../../components/layout/UserLayout";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

function UserProfile() {
  const { currentUser, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    dob: currentUser?.dob || "",
    gender: currentUser?.gender || "",
    address: currentUser?.address || "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initials = currentUser?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "U";

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4">
            ✅ Profile updated successfully!
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-purple-50 p-6 md:p-8">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-purple-50">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{currentUser?.name}</h2>
              <p className="text-purple-600 font-medium text-sm mt-0.5">{currentUser?.email}</p>
              <span className="inline-flex items-center mt-2 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                Patient
              </span>
            </div>
          </div>

          {/* Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name", key: "name", type: "text" },
              { label: "Email", key: "email", type: "email" },
              { label: "Phone", key: "phone", type: "tel" },
              { label: "Date of Birth", key: "dob", type: "date" },
              { label: "Gender", key: "gender", type: "text" },
              { label: "Address", key: "address", type: "text" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{field.label}</label>
                {editing ? (
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                  />
                ) : (
                  <p className="text-gray-900 font-medium text-sm px-4 py-3 bg-purple-50 rounded-xl">
                    {form[field.key] || <span className="text-gray-400">Not set</span>}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            {editing ? (
              <>
                <Button variant="primary" className="flex-1" onClick={handleSave}>Save Changes</Button>
                <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setEditing(true)}>✏️ Edit Profile</Button>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default UserProfile;