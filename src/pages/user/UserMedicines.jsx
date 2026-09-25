import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../components/layout/UserLayout";
import SearchBar from "../../components/ui/SearchBar";
import StatusBadge from "../../components/ui/StatusBadge";
import { useMedicines } from "../../context/MedicineContext";

function UserMedicines() {
  const { medicines, getStockStatus } = useMedicines();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = medicines.filter((m) =>
    m.medicineName.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <UserLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medicines</h1>
        <p className="text-gray-500 text-sm mt-1">Browse available medicines and check stock</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center justify-between">
        <div className="w-full sm:w-72"><SearchBar value={search} onChange={setSearch} placeholder="Search medicines..." /></div>
        <button
          onClick={() => navigate("/user/prescriptions")}
          className="btn-primary flex items-center gap-2 whitespace-nowrap bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
        >
          📋 Upload Prescription
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((med) => {
          const status = getStockStatus(med);
          return (
            <div key={med.id} className="bg-white rounded-2xl shadow-sm border border-purple-50 p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">💊</div>
                <StatusBadge status={status} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{med.medicineName}</h3>
              <p className="text-xs text-purple-600 font-medium mb-3">{med.category}</p>
              <div className="space-y-1.5 text-xs text-gray-500">
                <div className="flex justify-between"><span>Price</span><span className="font-semibold text-gray-800">₹{med.price}</span></div>
                <div className="flex justify-between"><span>Expiry</span><span className="font-medium">{med.expiryDate}</span></div>
                <div className="flex justify-between"><span>Stock</span><span className="font-medium">{med.quantity} units</span></div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">💊</div>
          <p>No medicines found</p>
        </div>
      )}
    </UserLayout>
  );
}

export default UserMedicines;