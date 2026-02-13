import { useEffect, useState } from "react";
import API from "../api/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  // LOAD ALL ORDERS
  const loadOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      alert("Failed to load orders");
    }
  };

  // UPDATE STATUS
  const updateStatus = async (orderId, status) => {
    if (!window.confirm(`Change status to ${status}?`)) return;

    try {
      await API.put(`/admin/orders/${orderId}/status?status=${status}`);
      loadOrders();
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📦 Admin Orders</h1>

      {/* ORDERS TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border p-2">{order.id}</td>
                  <td className="border p-2">{order.userId}</td>
                  <td className="border p-2">₹{order.totalAmount}</td>
                  <td className="border p-2 font-bold">
                    {order.status}
                  </td>
                  <td className="border p-2 space-x-1">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-gray-600 text-white px-2 py-1 rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() => updateStatus(order.id, "SHIPPED")}
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Ship
                    </button>

                    <button
                      onClick={() => updateStatus(order.id, "DELIVERED")}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Deliver
                    </button>

                    <button
                      onClick={() => updateStatus(order.id, "CANCELLED")}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW ORDER ITEMS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[420px]">
            <h2 className="text-xl font-bold mb-4">
              Order #{selectedOrder.id}
            </h2>

            {(selectedOrder.orderItems || []).length === 0 ? (
              <p className="text-gray-500">No items found</p>
            ) : (
              selectedOrder.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b py-2"
                >
                  <img
                    src={item.productImage || "https://via.placeholder.com/60"}
                    alt={item.productName}
                    className="w-14 h-14 object-cover rounded mr-3"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="font-semibold">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))
            )}

            <div className="mt-4 text-right font-bold">
              Total: ₹{selectedOrder.totalAmount}
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 w-full bg-black text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
