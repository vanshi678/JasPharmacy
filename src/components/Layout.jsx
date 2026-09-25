import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-100">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;