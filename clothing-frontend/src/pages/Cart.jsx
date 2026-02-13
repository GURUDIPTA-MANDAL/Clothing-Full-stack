import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadCart();
    loadProducts();
  }, []);

  // 🔹 Load cart items
  const loadCart = async () => {
    try {
      const res = await API.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  // 🔹 Load products
  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  // 🔹 Get product details by id
  const getProduct = (productId) =>
    products.find((p) => p.id === productId);

  // ➕ INCREASE QUANTITY
  const increaseQty = async (item) => {
    try {
      await API.put(
        `/cart/${item.id}/quantity?quantity=${item.quantity + 1}`
      );
      loadCart();
    } catch (err) {
      console.error("Increase quantity failed", err);
    }
  };

  // ➖ DECREASE QUANTITY (AUTO DELETE IF 0)
  const decreaseQty = async (item) => {
    try {
      await API.put(
        `/cart/${item.id}/quantity?quantity=${item.quantity - 1}`
      );
      loadCart();
    } catch (err) {
      console.error("Decrease quantity failed", err);
    }
  };

  // ❌ REMOVE ITEM DIRECTLY
  const removeItem = async (cartId) => {
    try {
      await API.delete(`/cart/${cartId}`);
      loadCart();
    } catch (err) {
      console.error("Remove item failed", err);
    }
  };

  // 💰 TOTAL AMOUNT
  const totalAmount = cart.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + item.quantity * (product?.price || 0);
  }, 0);

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">
            Your cart is empty
          </p>
        ) : (
          <>
            {cart.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-lg p-4 mb-4 shadow-sm"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-20 w-20 object-cover rounded"
                  />

                  <div className="flex-1 ml-4">
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-gray-500">
                      ₹{product.price}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => decreaseQty(item)}
                      className="px-3 py-1 bg-gray-300 rounded text-lg"
                    >
                      −
                    </button>

                    <span className="text-lg font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="px-3 py-1 bg-gray-300 rounded text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 font-semibold ml-4"
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            <div className="flex justify-between items-center mt-6 border-t pt-4">
              <h3 className="text-xl font-bold">
                Total: ₹{totalAmount}
              </h3>

              <button
                onClick={() => navigate("/address")}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
