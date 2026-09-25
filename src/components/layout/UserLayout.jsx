import { useState } from "react";
import UserSidebar from "./UserSidebar";
import MobileNav from "./MobileNav";

function UserLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <UserSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile Topbar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 bg-white border-b border-purple-100 sticky top-0 z-20 shadow-sm">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-purple-50 text-purple-700 text-xl font-bold hover:bg-purple-100 transition-all"
          >
            ☰
          </button>
          <span className="font-bold text-purple-700 text-lg">JasPharmacy</span>
          <span className="text-2xl">💊</span>
        </header>

        {/* Main content — add bottom padding so content isn't hidden behind MobileNav */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Bottom nav — only shows on mobile */}
      <MobileNav role="user" />
    </div>
  );
}

export default UserLayout;