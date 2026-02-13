import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      const res = await API.get("/admin/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      alert("Failed to load products");
    }
  };

  // ADD PRODUCT
  const addProduct = async () => {
    if (!name || !price) {
      alert("Name and Price are required");
      return;
    }

    try {
      await API.post("/admin/products", {
        name,
        price,
        category,
        imageUrl,
        description,
      });

      alert("Product added successfully");

      setName("");
      setPrice("");
      setCategory("");
      setImageUrl("");
      setDescription("");

      loadProducts();
    } catch (err) {
      alert("Failed to add product");
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/admin/products/${id}`);
      loadProducts();
    } catch {
      alert("Failed to delete product");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">👕 Admin Products</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* ADD PRODUCT FORM */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-xl font-bold mb-4">➕ Add Product</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <textarea
            className="border p-2 col-span-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          onClick={addProduct}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div>
        <h2 className="text-xl font-bold mb-4">📦 All Products</h2>

        <div className="grid grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded shadow">
              <img
                src={p.imageUrl || "https://via.placeholder.com/300"}
                alt={p.name}
                className="h-40 w-full object-cover mb-3"
              />
              <h3 className="font-bold">{p.name}</h3>
              <p>₹{p.price}</p>
              <p className="text-sm text-gray-500">{p.category}</p>

              <button
                onClick={() => deleteProduct(p.id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
