import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../components/layout/UserLayout";
import DoctorCard from "../../components/shared/DoctorCard";
import SearchBar from "../../components/ui/SearchBar";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { useDoctors } from "../../context/DoctorContext";
import { useAppointments } from "../../context/AppointmentContext";
import { useAuth } from "../../context/AuthContext";

function UserDoctors() {
  const { doctors } = useDoctors();
  const { addAppointment } = useAppointments();
  const { currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [form, setForm] = useState({ date: "", time: "", reason: "" });
  const [success, setSuccess] = useState(false);

  const specializations = ["All", ...new Set(doctors.map((d) => d.specialization))];
  const filtered = doctors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || d.specialization === filter;
    return matchSearch && matchFilter;
  });

  const handleBook = (doctor) => {
    setBookingDoctor(doctor);
    setSuccess(false);
    setForm({ date: "", time: "", reason: "" });
  };

  const handleConfirm = () => {
    addAppointment({
      patientName: currentUser?.name,
      patientId: currentUser?.id,
      doctorName: bookingDoctor.name,
      doctorId: bookingDoctor.id,
      specialization: bookingDoctor.specialization,
      appointmentDate: form.date,
      appointmentTime: form.time,
      reason: form.reason,
      status: "Upcoming",
    });
    setSuccess(true);
  };

  return (
    <UserLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Our Doctors</h1>
        <p className="text-gray-500 text-sm mt-1">Find and book appointments with our specialists</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search doctors..." /></div>
        <div className="flex gap-2 flex-wrap">
          {specializations.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === s ? "bg-purple-600 text-white shadow-sm" : "bg-white text-gray-600 border border-purple-100 hover:border-purple-300"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} showActions="user" onBook={handleBook} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">👨‍⚕️</div>
          <p>No doctors found</p>
        </div>
      )}

      <Modal isOpen={!!bookingDoctor} onClose={() => setBookingDoctor(null)} title={`Book Appointment`}>
        {success ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Appointment Booked!</h3>
            <p className="text-gray-500 text-sm">Your appointment with {bookingDoctor?.name} has been confirmed.</p>
            <Button variant="primary" className="mt-4" onClick={() => setBookingDoctor(null)}>Done</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="font-bold text-gray-900">{bookingDoctor?.name}</p>
              <p className="text-purple-600 text-sm">{bookingDoctor?.specialization}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time</label>
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reason for Visit</label>
              <textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}
                rows={3} placeholder="Briefly describe your reason..."
                className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm resize-none" />
            </div>
            <Button variant="primary" className="w-full" onClick={handleConfirm} disabled={!form.date || !form.time}>
              Confirm Booking
            </Button>
          </div>
        )}
      </Modal>
    </UserLayout>
  );
}

export default UserDoctors;