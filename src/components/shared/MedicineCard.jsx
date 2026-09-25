function MedicineCard({
  medicineName,
  category,
  quantity,
  price,
  expiryDate,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">

      <div>
        <h2 className="text-xl font-bold">
          💊 {medicineName}
        </h2>

        <p className="text-gray-500 mt-2">
          Category: {category}
        </p>

        <p className="text-gray-500">
          Quantity: {quantity}
        </p>

        <p className="text-gray-500">
          Price: ₹{price}
        </p>

        <p className="text-gray-500">
          Expiry: {expiryDate}
        </p>

        <span
          className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
            quantity <= 20
              ? "bg-red-100 text-red-700"
              : quantity <= 50
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {quantity <= 20
            ? "Low Stock"
            : quantity <= 50
            ? "Limited Stock"
            : "In Stock"}
        </span>
      </div>

      <div className="flex gap-3">

        <button
          onClick={onEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(medicineName)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default MedicineCard;