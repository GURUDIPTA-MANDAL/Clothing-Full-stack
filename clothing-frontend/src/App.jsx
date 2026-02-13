import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public
import Login from "./pages/Login";

// User pages
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";

// Guards
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtected from "./admin/AdminProtected";

// Admin pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />

        {/* USER AREA */}
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Route>

        {/* ADMIN AREA */}
        <Route element={<AdminProtected />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
