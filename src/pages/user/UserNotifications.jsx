import UserLayout from "../../components/layout/UserLayout";
import { useApp } from "../../context/AppContext";

function UserNotifications() {
  const { notifications, markNotificationRead } = useApp();
  const userNotifs = notifications.user || [];

  return (
    <UserLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-500 text-sm mt-1">{userNotifs.filter((n) => !n.read).length} unread notifications</p>
      </div>

      <div className="space-y-3 max-w-2xl">
        {userNotifs.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">🔔</div>
            <p>No notifications</p>
          </div>
        ) : (
          userNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead("user", notif.id)}
              className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all hover:shadow-sm ${notif.read ? "bg-white border-gray-100" : "bg-purple-50 border-purple-100"}`}
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm flex-shrink-0">{notif.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-bold ${notif.read ? "text-gray-700" : "text-gray-900"}`}>{notif.title}</h3>
                  {!notif.read && <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </UserLayout>
  );
}

export default UserNotifications;