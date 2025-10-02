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
    <main className="h-screen bg-gradient-to-r from-blue-900 to-blue-700 flex flex-col items-center justify-center px-6">

      <h1 className="text-blue-500 text-[60px] font-bold mb-8 tracking-tighter">Don's<span className="text-white">Fitness</span></h1>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-black">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2 tracking-tight">
          Admin Portal
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Log in to manage the system
        </p>

        {/* Error message */}
        {error && (
          <div className="bg-blue-500 text-white text-sm px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-y-4" onSubmit={handleLogin}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              className="w-full px-4 py-3 rounded-lg text-white bg-gray-500 focus:outline-none focus:ring-3 focus:ring-blue-500"
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              className="w-full px-4 py-3 rounded-lg text-white bg-gray-500 focus:outline-none focus:ring-3 focus:ring-blue-500"
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-2 rounded-lg shadow"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}
