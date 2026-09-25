import { useState } from "react";
import Layout from "../components/Layout";

function Profile() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [phone, setPhone] = useState("9876543210");
  const [hospital, setHospital] = useState("JasPharmacy");
  const [editing, setEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setEditing(false);
    alert("Profile Updated Successfully!");
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">
              A
            </div>

            <h1 className="text-3xl font-bold mt-5">
              Administrator
            </h1>

            <p className="text-gray-500">
              Hospital Management System
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6 mt-10"
          >

            <div>
              <label className="font-semibold">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                disabled={!editing}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="font-semibold">
                Email
              </label>

              <input
                type="email"
                value={email}
                disabled={!editing}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="font-semibold">
                Phone
              </label>

              <input
                type="text"
                value={phone}
                disabled={!editing}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-2 border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="font-semibold">
                Hospital Name
              </label>

              <input
                type="text"
                value={hospital}
                disabled={!editing}
                onChange={(e) => setHospital(e.target.value)}
                className="w-full mt-2 border rounded-lg p-3"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-4 mt-4">

              {!editing ? (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="bg-gray-400 text-white px-6 py-3 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                  >
                    Save Changes
                  </button>
                </>
              )}

            </div>

          </form>

        </div>
      </div>
    </Layout>
  );
}

export default Profile;