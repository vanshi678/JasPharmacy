import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Button from "../../components/ui/Button";
import { useMedicines } from "../../context/MedicineContext";

const MOCK_SCAN_RESULTS = [
  { medicineName: "Paracetamol 500mg", expiryDate: "2028-06-30", category: "Tablet" },
  { medicineName: "Amoxicillin 250mg", expiryDate: "2027-11-15", category: "Capsule" },
  { medicineName: "Ibuprofen 400mg", expiryDate: "2027-03-20", category: "Tablet" },
  { medicineName: "Cetirizine 10mg", expiryDate: "2028-01-10", category: "Tablet" },
];

function ScanMedicine() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [detected, setDetected] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [added, setAdded] = useState(false);
  const [uploadPreview, setUploadPreview] = useState(null);
  const { addMedicine } = useMedicines();

  const handleScan = () => {
    setScanning(true);
    setScanned(false);
    setDetected(null);
    setAdded(false);
    setTimeout(() => {
      const result = MOCK_SCAN_RESULTS[Math.floor(Math.random() * MOCK_SCAN_RESULTS.length)];
      setDetected(result);
      setScanning(false);
      setScanned(true);
    }, 2500);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target.result);
    reader.readAsDataURL(file);
    setScanning(true);
    setScanned(false);
    setTimeout(() => {
      const result = MOCK_SCAN_RESULTS[Math.floor(Math.random() * MOCK_SCAN_RESULTS.length)];
      setDetected(result);
      setScanning(false);
      setScanned(true);
    }, 2000);
  };

  const handleAdd = () => {
    if (!detected || !quantity) return;
    addMedicine({ ...detected, quantity: Number(quantity), price: 0 });
    setAdded(true);
    setQuantity("");
    setTimeout(() => {
      setAdded(false);
      setScanned(false);
      setDetected(null);
      setUploadPreview(null);
    }, 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Scan Medicine</h1>
          <p className="text-gray-500 text-sm mt-1">Scan a medicine package to automatically detect its details</p>
        </div>

        {added && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
            ✅ <strong>{detected?.medicineName}</strong> added to inventory!
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-purple-50 p-6 md:p-8">
          {/* Scanner Area */}
          <div className={`relative rounded-2xl border-2 overflow-hidden mb-6 transition-all ${scanning ? "border-purple-400 bg-purple-50" : scanned ? "border-green-400 bg-green-50" : "border-dashed border-purple-200 bg-gray-50"}`} style={{ height: 220 }}>
            {uploadPreview && !scanning ? (
              <img src={uploadPreview} alt="Uploaded" className="w-full h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                {scanning ? (
                  <>
                    <div className="relative mb-3">
                      <div className="w-16 h-16 rounded-full border-4 border-purple-300 border-t-purple-600 animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center text-2xl">📷</div>
                    </div>
                    <p className="text-purple-600 font-semibold text-sm">Scanning...</p>
                    <p className="text-purple-400 text-xs mt-1">Detecting medicine information</p>
                  </>
                ) : scanned ? (
                  <>
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-green-600 font-semibold text-sm">Scan Complete!</p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl mb-3 opacity-30">📷</div>
                    <p className="text-gray-400 text-sm">Camera scanner area</p>
                    <p className="text-gray-300 text-xs mt-1">Click "Start Scan" below</p>
                  </>
                )}
              </div>
            )}
            {/* Scanning line animation */}
            {scanning && (
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" style={{ animation: "scanLine 1.5s ease-in-out infinite" }} />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <Button variant="primary" className="flex-1" onClick={handleScan} disabled={scanning}>
              {scanning ? "Scanning..." : "📷 Start Scan"}
            </Button>
            <label className="flex-1">
              <input type="file" accept="image/*" hidden onChange={handleUpload} />
              <div className="w-full btn-secondary flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl cursor-pointer bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-all">
                📁 Upload Image
              </div>
            </label>
          </div>

          {/* Detected Info */}
          {scanned && detected && (
            <div className="border border-purple-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-500 text-lg">✅</span>
                <h3 className="font-bold text-gray-900">Detected Information</h3>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full ml-auto">Auto-detected</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <span className="text-sm text-gray-600 font-medium">Medicine Name</span>
                  <span className="font-bold text-gray-900 text-sm">{detected.medicineName}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <span className="text-sm text-gray-600 font-medium">Expiry Date</span>
                  <span className="font-bold text-gray-900 text-sm">{detected.expiryDate}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <span className="text-sm text-gray-600 font-medium">Category</span>
                  <span className="font-bold text-gray-900 text-sm">{detected.category}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Quantity <span className="text-purple-500">(Enter manually)</span>
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  placeholder="Enter quantity..."
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm mb-4"
                />
                <Button variant="primary" className="w-full" onClick={handleAdd} disabled={!quantity}>
                  💊 Add to Inventory
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scanLine {
          0% { top: 0; }
          50% { top: calc(100% - 4px); }
          100% { top: 0; }
        }
      `}</style>
    </AdminLayout>
  );
}

export default ScanMedicine;