import { useState } from "react";
import API from "../api/api";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    // 🔴 BASIC VALIDATION
    if (!username || !password || (isRegister && !email)) {
      alert("Please fill all fields");
      return;
    }

    try {
      // 🔐 ADMIN LOGIN (Exam-friendly)
      if (username === "admin" && password === "admin123") {
        localStorage.clear();
        localStorage.setItem("role", "ADMIN");
        alert("Admin Login Successful");
        window.location.href = "/admin";
        return;
      }

      // 👤 USER REGISTRATION
      if (isRegister) {
        const res = await API.post(
          "/users/register",
          {
            username,
            password,
            email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data.success) {
          alert(res.data.message || "Registration successful. Please login.");
          setIsRegister(false);
          setUsername("");
          setPassword("");
          setEmail("");
        } else {
          alert(res.data.message || "Registration failed");
        }
        return;
      }

      // 👤 USER LOGIN
      const res = await API.post(
        "/users/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        localStorage.clear();
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("role", "USER");
        alert("User Login Successful");
        window.location.href = "/products";
      } else {
        alert(res.data.message || "Login failed");
        localStorage.clear();
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Server error. Please try again.");
      }
      console.error(err);
      localStorage.clear();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>

        {/* Username */}
        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email (Only for Register) */}
        {isRegister && (
          <input
            className="border p-2 w-full mb-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        {/* Password */}
        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          {isRegister ? "Register" : "Login"}
        </button>

        {/* Toggle Login/Register */}
        <p
          className="text-center mt-4 text-blue-600 cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "New user? Register here"}
        </p>

        {/* Admin Info */}
        <p className="text-center mt-2 text-sm text-gray-500">
          Admin → <b>username: admin | password: admin123</b>
        </p>
      </div>
    </div>
  );
}
