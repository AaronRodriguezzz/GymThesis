import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../api/apis";

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await postData("/api/admin/login", credentials);

      if (res.success) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 flex items-center justify-center px-6">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md text-white">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2 tracking-tight">
          Admin Portal
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Log in to manage the system
        </p>

        {/* Error message */}
        {error && (
          <div className="bg-red-500 text-white text-sm px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-y-4" onSubmit={handleLogin}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="admin"
              value={credentials.username}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={credentials.password}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 transition text-white font-semibold py-2 rounded-lg shadow"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}
