import UserLayout from "../../components/layout/UserLayout";
import StatusBadge from "../../components/ui/StatusBadge";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

const STEPS = ["Pending", "Reviewing", "Preparing", "Ready", "Completed"];

function MyRequests() {
  const { prescriptions } = useApp();
  const { currentUser } = useAuth();
  const myRequests = prescriptions.filter((p) => p.patientId === currentUser?.id || p.patientName === currentUser?.name);

  return (
    <UserLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Medicine Requests</h1>
        <p className="text-gray-500 text-sm mt-1">Track the status of your prescription requests</p>
      </div>

      {myRequests.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📦</div>
          <p>No requests yet</p>
        </div>
      ) : (
        <div className="space-y-5">
          {myRequests.map((rx) => {
            const currentStep = STEPS.indexOf(rx.status);
            return (
              <div key={rx.id} className="bg-white rounded-2xl shadow-sm border border-purple-50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{rx.requestId}</span>
                      <StatusBadge status={rx.status} />
                    </div>
                    <p className="text-sm text-gray-500">📅 {rx.date} · 📄 {rx.fileName} · {rx.fileSize}</p>
                    {rx.notes && <p className="text-xs text-gray-400 mt-1">📝 {rx.notes}</p>}
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-4">
                  <div className="flex items-center">
                    {STEPS.map((step, i) => (
                      <div key={step} className="flex-1 flex flex-col items-center relative">
                        {i < STEPS.length - 1 && (
                          <div className={`absolute top-2.5 left-1/2 w-full h-0.5 ${i < currentStep ? "bg-purple-500" : "bg-gray-200"}`} />
                        )}
                        <div className={`w-5 h-5 rounded-full border-2 z-10 flex items-center justify-center ${
                          i < currentStep ? "bg-purple-500 border-purple-500" :
                          i === currentStep ? "bg-white border-purple-500" :
                          "bg-white border-gray-200"
                        }`}>
                          {i < currentStep && <span className="text-white text-xs">✓</span>}
                          {i === currentStep && <span className="w-2 h-2 rounded-full bg-purple-500 block" />}
                        </div>
                        <span className={`text-xs mt-1 text-center ${i <= currentStep ? "text-purple-600 font-semibold" : "text-gray-400"}`}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </UserLayout>
  );
}

export default MyRequests;