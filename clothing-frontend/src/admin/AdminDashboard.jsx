import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    // 1️⃣ Clear all stored auth data
    localStorage.clear();

    // 2️⃣ Redirect to login & prevent back navigation
    navigate("/", { replace: true });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">🛠 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
        {/* PRODUCTS */}
        <button
          className="bg-blue-600 text-white px-6 py-4 rounded text-lg shadow"
          onClick={() => navigate("/admin/products")}
        >
          👕 Manage Products
        </button>

        {/* ORDERS */}
        <button
          className="bg-green-600 text-white px-6 py-4 rounded text-lg shadow"
          onClick={() => navigate("/admin/orders")}
        >
          📦 View Orders
        </button>

        {/* USERS */}
        <button
          className="bg-purple-600 text-white px-6 py-4 rounded text-lg shadow"
          onClick={() => navigate("/admin/users")}
        >
          👤 User Details
        </button>

        {/* LOGOUT */}
        <button
          className="bg-red-600 text-white px-6 py-4 rounded text-lg shadow"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
