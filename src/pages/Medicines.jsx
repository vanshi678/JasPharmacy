import { useContext, useState } from "react";
import Layout from "../components/Layout";
import MedicineCard from "../components/MedicineCard";
import { MedicineContext } from "../context/MedicineContext";

function Medicines() {
  const [showModal, setShowModal] = useState(false);

  const { medicines, setMedicines } = useContext(MedicineContext);

  const [medicineName, setMedicineName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [medicineToEdit, setMedicineToEdit] = useState(null);

  function handleAddMedicine(e) {
    e.preventDefault();

    if (
      medicineName.trim() === "" ||
      category.trim() === "" ||
      quantity === "" ||
      price === "" ||
      expiryDate === ""
    ) {
      setError("Please fill all fields.");
      return;
    }

    const newMedicine = {
      medicineName,
      category,
      quantity,
      price,
      expiryDate,
    };

    if (isEditing) {
      const updatedMedicines = medicines.map((medicine) => {
        if (
          medicine.medicineName ===
          medicineToEdit.medicineName
        ) {
          return newMedicine;
        }

        return medicine;
      });

      setMedicines(updatedMedicines);
      setIsEditing(false);
      setMedicineToEdit(null);
    } else {
      setMedicines([...medicines, newMedicine]);
    }

    setMedicineName("");
    setCategory("");
    setQuantity("");
    setPrice("");
    setExpiryDate("");

    setError("");
    setShowModal(false);
  }

  function handleDeleteMedicine(name) {
    const updatedMedicines = medicines.filter(
      (medicine) => medicine.medicineName !== name
    );

    setMedicines(updatedMedicines);
  }

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.medicineName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      medicine.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Medicines
        </h1>

        <button
          onClick={() => {
            setShowModal(true);

            setIsEditing(false);
            setMedicineToEdit(null);

            setMedicineName("");
            setCategory("");
            setQuantity("");
            setPrice("");
            setExpiryDate("");

            setError("");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Medicine
        </button>

      </div>

      <input
        type="text"
        placeholder="Search Medicine..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-white p-4 rounded-xl shadow mb-8 outline-none"
      />

      <div className="space-y-6">
        {filteredMedicines.map((medicine, index) => (
          <MedicineCard
            key={index}
            medicineName={medicine.medicineName}
            category={medicine.category}
            quantity={medicine.quantity}
            price={medicine.price}
            expiryDate={medicine.expiryDate}
            onDelete={(medicineName) => {
              setMedicineToDelete(medicineName);
              setShowDeleteModal(true);
            }}
            onEdit={() => {
              setIsEditing(true);
              setShowModal(true);
              setMedicineToEdit(medicine);

              setMedicineName(medicine.medicineName);
              setCategory(medicine.category);
              setQuantity(medicine.quantity);
              setPrice(medicine.price);
              setExpiryDate(medicine.expiryDate);
            }}
          />
        ))}
      </div>

      {/* Add / Edit Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-8 rounded-2xl w-96">

            <h2 className="text-2xl font-bold mb-6">
              {isEditing ? "Edit Medicine" : "Add Medicine"}
            </h2>

            {error && (
              <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                {error}
              </p>
            )}

            <form
              onSubmit={handleAddMedicine}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Medicine Name"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select Category</option>
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Injection">Injection</option>
                <option value="Cream">Cream</option>
                <option value="Drops">Drops</option>
              </select>

              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);

                    setIsEditing(false);
                    setMedicineToEdit(null);

                    setMedicineName("");
                    setCategory("");
                    setQuantity("");
                    setPrice("");
                    setExpiryDate("");

                    setError("");
                  }}
                  className="bg-gray-300 px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? "Update Medicine" : "Add Medicine"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* Delete Modal */}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-8 rounded-2xl w-96">

            <h2 className="text-2xl font-bold mb-4">
              Confirm Delete
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete
              <strong> {medicineToDelete}</strong>?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setMedicineToDelete(null);
                }}
                className="bg-gray-300 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDeleteMedicine(medicineToDelete);
                  setShowDeleteModal(false);
                  setMedicineToDelete(null);
                }}
                className="bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </Layout>
  );
}

export default Medicines;