import { useContext } from "react";
import Layout from "../components/Layout";
import { DoctorContext } from "../context/DoctorContext";
import { AppointmentContext } from "../context/AppointmentContext";
import { MedicineContext } from "../context/MedicineContext";

function Dashboard() {
  const { doctors } = useContext(DoctorContext);
  const { appointments } = useContext(AppointmentContext);
  const { medicines } = useContext(MedicineContext);

  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;
  const totalMedicines = medicines.length;

  const availableDoctors = doctors.filter(
    (doctor) => doctor.status === "Available"
  ).length;

  const busyDoctors = doctors.filter(
    (doctor) => doctor.status === "Busy"
  ).length;

  const scheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "Scheduled"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelled"
  ).length;

  const lowStockMedicines = medicines.filter(
    (medicine) => Number(medicine.quantity) < 20
  ).length;

  const stats = [
    {
      title: "Total Doctors",
      value: totalDoctors,
      icon: "👨‍⚕️",
      color: "bg-blue-500",
    },
    {
      title: "Appointments",
      value: totalAppointments,
      icon: "📅",
      color: "bg-yellow-500",
    },
    {
      title: "Medicines",
      value: totalMedicines,
      icon: "💊",
      color: "bg-red-500",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome to JasPharmacy Admin Panel
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center hover:shadow-xl transition"
            >
              <div>
                <p className="text-gray-500">{card.title}</p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} text-white text-3xl h-16 w-16 rounded-full flex items-center justify-center`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Clinic Overview */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">
              Clinic Overview
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between border-b pb-2">
                <span>👨‍⚕️ Total Doctors</span>
                <span className="font-semibold">{totalDoctors}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>🟢 Available Doctors</span>
                <span className="font-semibold text-green-600">
                  {availableDoctors}
                </span>
              </div>

              <div className="flex justify-between">
                <span>🔴 Busy Doctors</span>
                <span className="font-semibold text-red-600">
                  {busyDoctors}
                </span>
              </div>
            </div>
          </div>

          {/* Clinic Insights */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">
              Clinic Insights
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between border-b pb-2">
                <span>📅 Scheduled Appointments</span>
                <span className="font-semibold text-yellow-600">
                  {scheduledAppointments}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>✅ Completed Appointments</span>
                <span className="font-semibold text-green-600">
                  {completedAppointments}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>❌ Cancelled Appointments</span>
                <span className="font-semibold text-red-600">
                  {cancelledAppointments}
                </span>
              </div>

              <div className="flex justify-between">
                <span>⚠️ Low Stock Medicines</span>
                <span className="font-semibold text-orange-500">
                  {lowStockMedicines}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;