import { useState, useRef } from "react";
import UserLayout from "../../components/layout/UserLayout";
import Button from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

function UploadPrescription() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef();
  const { addPrescription } = useApp();
  const { currentUser } = useAuth();

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    const rx = {
      id: `rx${Date.now()}`,
      requestId: `REQ-${Math.floor(Math.random() * 900 + 100)}`,
      patientName: currentUser?.name,
      patientId: currentUser?.id,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(0)} KB`,
      fileType: file.type.startsWith("image/") ? "image" : "pdf",
      status: "Pending",
      notes,
    };
    addPrescription(rx);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto mt-16 text-center">
          <div className="bg-white rounded-3xl shadow-sm border border-purple-50 p-10">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Prescription Submitted!</h2>
            <p className="text-gray-500 mb-4">Your prescription is now pending review by our pharmacy team.</p>
            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-purple-700 font-medium">Status: <span className="font-bold">Pending Review</span></p>
              <p className="text-xs text-purple-500 mt-1">You will be notified when it's ready.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="primary" className="flex-1" onClick={() => { setSubmitted(false); setFile(null); setPreview(null); setNotes(""); }}>
                Upload Another
              </Button>
              <Button variant="secondary" className="flex-1" onClick={() => window.location.href = "/user/requests"}>
                View Requests
              </Button>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Upload Prescription</h1>
          <p className="text-gray-500 text-sm mt-1">Upload your prescription and our team will prepare your medicines.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-purple-50 p-6 md:p-8">
          {/* Upload Zone */}
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${dragging ? "border-purple-500 bg-purple-50" : "border-purple-200 hover:border-purple-400 hover:bg-purple-50/50"}`}
            >
              <div className="text-5xl mb-3">📤</div>
              <h3 className="font-bold text-gray-900 mb-1">Drag & Drop your prescription</h3>
              <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
              <p className="text-xs text-gray-400">Supported: JPG, JPEG, PNG, PDF (max 10MB)</p>
              <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.pdf" hidden onChange={(e) => handleFile(e.target.files[0])} />
            </div>
          ) : (
            <div className="border border-purple-200 rounded-2xl p-4">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full max-h-64 object-contain rounded-xl mb-3" />
              ) : (
                <div className="bg-purple-50 rounded-xl p-6 text-center mb-3">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="font-medium text-gray-700">{file.name}</p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
                <button onClick={() => { setFile(null); setPreview(null); }} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove ✕</button>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any special instructions or notes for the pharmacist..."
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm resize-none"
            />
          </div>

          <Button
            variant="primary"
            className="w-full mt-4"
            onClick={handleSubmit}
            disabled={!file}
          >
            📋 Submit Prescription
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}

export default UploadPrescription;