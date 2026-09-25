import { useContext, useState } from "react";
import Layout from "../components/Layout";
import AppointmentCard from "../components/AppointmentCard";
import { DoctorContext } from "../context/DoctorContext";
import { AppointmentContext } from "../context/AppointmentContext";

function Appointments() {

  const [showModal, setShowModal] = useState(false);

  // Sample Doctors
  const { doctors } = useContext(DoctorContext);
  const { appointments, setAppointments } =
  useContext(AppointmentContext);

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [status, setStatus] = useState("Scheduled");

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);

  // Doctors available on selected date
  const availableDoctors = doctors.filter(
    (doctor) => doctor.arrivingDate === appointmentDate
  );

  function handleAddAppointment(e) {
    e.preventDefault();

    if (
      patientName.trim() === "" ||
      age === "" ||
      gender === "" ||
      phone.trim() === "" ||
      doctorName === "" ||
      appointmentDate === ""
    ) {
      setError("Please fill all fields.");
      return;
    }

    const newAppointment = {
      patientName,
      age,
      gender,
      phone,
      doctorName,
      appointmentDate,
      status,
    };

    if (isEditing) {

      const updatedAppointments = appointments.map((appointment) => {

        if (
          appointment.patientName === appointmentToEdit.patientName &&
          appointment.phone === appointmentToEdit.phone
        ) {
          return newAppointment;
        }

        return appointment;

      });

      setAppointments(updatedAppointments);

      setIsEditing(false);
      setAppointmentToEdit(null);

    } else {

      setAppointments([...appointments, newAppointment]);

    }

    setPatientName("");
    setAge("");
    setGender("");
    setPhone("");
    setDoctorName("");
    setAppointmentDate("");
    setStatus("Scheduled");

    setError("");

    setShowModal(false);
  }

  function handleDeleteAppointment(phone) {

    const updatedAppointments = appointments.filter(
      (appointment) => appointment.phone !== phone
    );

    setAppointments(updatedAppointments);

  }

  const filteredAppointments = appointments.filter((appointment) =>

    appointment.patientName
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    appointment.doctorName
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    appointment.phone
      .includes(search)

  );

  return (

    <Layout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Appointments
        </h1>

        <button
          onClick={() => {
            setShowModal(true);

            setIsEditing(false);
            setAppointmentToEdit(null);

            setPatientName("");
            setAge("");
            setGender("");
            setPhone("");
            setDoctorName("");
            setAppointmentDate("");
            setStatus("Scheduled");

            setError("");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Book Appointment
        </button>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Appointment..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-white p-4 rounded-xl shadow mb-8 outline-none"
      />

      {/* Appointment Cards */}

      <div className="space-y-6">

        {filteredAppointments.map((appointment, index) => (

          <AppointmentCard
            key={index}
            patientName={appointment.patientName}
            age={appointment.age}
            gender={appointment.gender}
            phone={appointment.phone}
            doctorName={appointment.doctorName}
            appointmentDate={appointment.appointmentDate}
            status={appointment.status}
            onDelete={(phone) => {
              setAppointmentToDelete(phone);
              setShowDeleteModal(true);
            }}
            onEdit={() => {

              setIsEditing(true);
              setShowModal(true);

              setAppointmentToEdit(appointment);

              setPatientName(appointment.patientName);
              setAge(appointment.age);
              setGender(appointment.gender);
              setPhone(appointment.phone);
              setDoctorName(appointment.doctorName);
              setAppointmentDate(appointment.appointmentDate);
              setStatus(appointment.status);

            }}
          />

        ))}

      </div>

      {/* Add / Edit Appointment */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-8 rounded-2xl w-[430px]">

            <h2 className="text-2xl font-bold mb-6">

              {isEditing
                ? "Edit Appointment"
                : "Book Appointment"}

            </h2>

            {error && (

              <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                {error}
              </p>

            )}

            <form
              onSubmit={handleAddAppointment}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => {
                  setAppointmentDate(e.target.value);
                  setDoctorName("");
                }}
                className="w-full border rounded-lg p-3"
              />

              <select
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select Doctor</option>

                {availableDoctors.map((doctor, index) => (

                  <option
                    key={index}
                    value={doctor.name}
                  >
                    {doctor.name}
                  </option>

                ))}

              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);

                    setPatientName("");
                    setAge("");
                    setGender("");
                    setPhone("");
                    setDoctorName("");
                    setAppointmentDate("");
                    setStatus("Scheduled");

                    setError("");

                    setIsEditing(false);
                    setAppointmentToEdit(null);
                  }}
                  className="bg-gray-300 px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  {isEditing
                    ? "Update Appointment"
                    : "Book Appointment"}
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
              Are you sure you want to delete this appointment?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setAppointmentToDelete(null);
                }}
                className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDeleteAppointment(appointmentToDelete);
                  setShowDeleteModal(false);
                  setAppointmentToDelete(null);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
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

export default Appointments;