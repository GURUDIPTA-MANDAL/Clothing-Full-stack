import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Address() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    fullAddress: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    try {
      // 👉 totalAmount can also be calculated in backend
      const totalAmount = Number(localStorage.getItem("totalAmount")) || 0;

      await API.post("/orders/place", {
        userId,
        totalAmount,
        address,
      });

      alert("Order placed successfully!");
      navigate("/order-success");

    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">📍 Delivery Address</h2>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            className="border p-2 w-full rounded"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            className="border p-2 w-full rounded"
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="city"
              placeholder="City"
              className="border p-2 w-full rounded"
              onChange={handleChange}
            />

            <input
              name="state"
              placeholder="State"
              className="border p-2 w-full rounded"
              onChange={handleChange}
            />
          </div>

          <input
            name="pincode"
            placeholder="Pincode"
            className="border p-2 w-full rounded"
            onChange={handleChange}
          />

          <textarea
            name="fullAddress"
            placeholder="Full Address"
            className="border p-2 w-full rounded"
            rows="4"
            onChange={handleChange}
          ></textarea>

          <button
            onClick={placeOrder}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
