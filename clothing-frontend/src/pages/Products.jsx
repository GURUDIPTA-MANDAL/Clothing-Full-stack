import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // prevent double click
  const userId = localStorage.getItem("userId");

  // 🔹 Load all products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
      alert("Failed to load products ❌");
    }
  };

  // 🔥 ADD TO CART (NO DUPLICATES)
  const addToCart = async (productId) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    if (loadingId === productId) return; // stop double click
    setLoadingId(productId);

    try {
      await API.post(
        `/cart/add?userId=${userId}&productId=${productId}&quantity=1`
      );
      alert("Added to cart ✅");
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Add to cart failed ❌");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">
          👕 Our Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-40 w-full object-cover rounded mb-3"
                />

                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-gray-600 mb-2">₹{p.price}</p>

                <button
                  onClick={() => addToCart(p.id)}
                  disabled={loadingId === p.id}
                  className={`w-full mt-2 px-4 py-2 rounded text-white ${
                    loadingId === p.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loadingId === p.id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
