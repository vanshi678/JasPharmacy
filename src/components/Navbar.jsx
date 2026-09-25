function Navbar() {
  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        JasPharmacy
      </h1>

      <div className="flex items-center gap-4">

        <button className="text-2xl">
          🔔
        </button>

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex justify-center items-center font-bold">
          A
        </div>

      </div>

    </div>
  );
}

export default Navbar;