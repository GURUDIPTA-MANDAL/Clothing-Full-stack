import { useEffect, useState } from "react";
import API from "../api/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const blockUser = async (id) => {
    await API.put(`/admin/users/${id}/block`);
    loadUsers();
  };

  const unblockUser = async (id) => {
    await API.put(`/admin/users/${id}/unblock`);
    loadUsers();
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">👤 User Details</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center">
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.username}</td>
              <td className="border p-2">{u.email}</td>

              <td className="border p-2">
                {u.blocked ? (
                  <span className="text-red-600 font-bold">BLOCKED</span>
                ) : (
                  <span className="text-green-600 font-bold">ACTIVE</span>
                )}
              </td>

              <td className="border p-2">
                {u.blocked ? (
                  <button
                    onClick={() => unblockUser(u.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => blockUser(u.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
