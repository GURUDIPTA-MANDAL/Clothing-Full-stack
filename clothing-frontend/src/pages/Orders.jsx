import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await API.get(`/orders/user/${userId}`);
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">📦 My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">
            You have not placed any orders yet.
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">
                    Order #{order.id}
                  </h3>

                  <span className="px-3 py-1 rounded text-sm bg-green-100 text-green-700">
                    {order.status}
                  </span>
                </div>

                <p className="text-gray-600">
                  Date:{" "}
                  <b>{new Date(order.orderDate).toLocaleString()}</b>
                </p>

                <p className="text-gray-600">
                  Total: <b>₹{order.totalAmount}</b>
                </p>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="mt-3 bg-black text-white px-4 py-1 rounded"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= ORDER DETAILS MODAL ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[420px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              Order #{selectedOrder.id}
            </h2>

            {/* 📦 ORDER ITEMS */}
            {(selectedOrder.orderItems || []).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center border-b py-3"
              >
                <img
                  src={item.productImage || "https://via.placeholder.com/60"}
                  alt={item.productName}
                  className="h-14 w-14 object-cover rounded mr-3"
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
            ))}

            {/* 🏠 ADDRESS (SAFE RENDER) */}
            <div className="mt-4 p-3 border rounded bg-gray-50">
              <h3 className="font-bold mb-2">📍 Delivery Address</h3>

              {selectedOrder.orderAddress ? (
                <>
                  <p>
                    <b>Name:</b>{" "}
                    {selectedOrder.orderAddress.fullName}
                  </p>
                  <p>
                    <b>Phone:</b>{" "}
                    {selectedOrder.orderAddress.phone}
                  </p>
                  <p>
                    <b>Address:</b>{" "}
                    {selectedOrder.orderAddress.fullAddress}
                  </p>
                  <p>
                    {selectedOrder.orderAddress.city},{" "}
                    {selectedOrder.orderAddress.state} -{" "}
                    {selectedOrder.orderAddress.pincode}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">
                  Address not available
                </p>
              )}
            </div>

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
    </>
  );
}
