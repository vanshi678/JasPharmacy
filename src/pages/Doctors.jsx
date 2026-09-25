import Layout from "../components/Layout";
import DoctorCard from "../components/DoctorCard";
import { useContext, useState } from "react";
import { DoctorContext } from "../context/DoctorContext";

function Doctors() {
  const [showModal, setShowModal] = useState(false);

  const { doctors, setDoctors } = useContext(DoctorContext);

  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [arrivingDate, setArrivingDate] = useState("");
  const [status, setStatus] = useState("Available");
  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [doctorToEdit, setDoctorToEdit] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  function handleAddDoctor(e) {
    e.preventDefault();

    if (
      doctorName.trim() === "" ||
      specialization.trim() === "" ||
      arrivingDate === ""
    ) {
      setError("Please fill all fields.");
      return;
    }

    const newDoctor = {
      name: doctorName,
      specialization,
      arrivingDate,
      status,
    };

    if (isEditing) {
      const updatedDoctors = doctors.map((doctor) => {
        if (doctor.name === doctorToEdit.name) {
          return newDoctor;
        }

        return doctor;
      });

      setDoctors(updatedDoctors);
      setIsEditing(false);
      setDoctorToEdit(null);
    } else {
      setDoctors([...doctors, newDoctor]);
    }

    setDoctorName("");
    setSpecialization("");
    setArrivingDate("");
    setStatus("Available");
    setError("");

    setShowModal(false);
  }

  function handleDeleteDoctor(name) {
    const updatedDoctors = doctors.filter(
      (doctor) => doctor.name !== name
    );

    setDoctors(updatedDoctors);
    setIsEditing(false);
    setDoctorToEdit(null);
  }

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || doctor.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Doctors
        </h1>

        <button
          onClick={() => {
            setShowModal(true);
            setError("");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Doctor
        </button>

      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Search Doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white p-4 rounded-xl shadow outline-none"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white p-4 rounded-xl shadow outline-none lg:w-48"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Busy">Busy</option>
        </select>

      </div>

      <div className="space-y-6">

        {filteredDoctors.map((doctor, index) => (

          <DoctorCard
            key={index}
            name={doctor.name}
            specialization={doctor.specialization}
            arrivingDate={doctor.arrivingDate}
            status={doctor.status}
            onDelete={(name) => {
              setDoctorToDelete(name);
              setShowDeleteModal(true);
            }}
            onEdit={() => {
              setIsEditing(true);
              setShowModal(true);
              setDoctorToEdit(doctor);

              setDoctorName(doctor.name);
              setSpecialization(doctor.specialization);
              setArrivingDate(doctor.arrivingDate);
              setStatus(doctor.status);
            }}
          />

        ))}

      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-8 rounded-2xl w-96">

            <h2 className="text-2xl font-bold mb-6">
              {isEditing ? "Edit Doctor" : "Add Doctor"}
            </h2>

            {error && (
              <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                {error}
              </p>
            )}

            <form
              onSubmit={handleAddDoctor}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Doctor Name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="date"
                value={arrivingDate}
                onChange={(e) => setArrivingDate(e.target.value)}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError("");
                    setDoctorName("");
                    setSpecialization("");
                    setArrivingDate("");
                    setStatus("Available");
                    setIsEditing(false);
                    setDoctorToEdit(null);
                  }}
                  className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? "Update Doctor" : "Save Doctor"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-8 rounded-2xl w-96">

            <h2 className="text-2xl font-bold mb-4">
              Confirm Delete
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{doctorToDelete}</strong>?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDoctorToDelete(null);
                }}
                className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDeleteDoctor(doctorToDelete);
                  setShowDeleteModal(false);
                  setDoctorToDelete(null);
                }}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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

export default Doctors;