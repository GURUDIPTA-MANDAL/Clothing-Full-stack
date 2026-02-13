import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          
          {/* Success Icon */}
          <div className="text-green-600 text-6xl mb-4">✓</div>

          <h2 className="text-3xl font-bold mb-2 text-green-600">
            Order Confirmed!
          </h2>

          <p className="text-gray-600 mb-6">
            Your order has been placed successfully.  
            Payment status: <b>SUCCESS</b>
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/orders")}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Track Your Order
            </button>

            <button
              onClick={() => navigate("/products")}
              className="w-full bg-gray-200 py-2 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
