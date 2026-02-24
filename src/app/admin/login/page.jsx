"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/users/login", { email, password });

      console.log("🔵 Full login response:", data);
      console.log("🔵 data.data:", data.data);
      console.log("🔵 role:", data.data?.role);
      console.log("🔵 token:", data.data?.token);

      const token = data.data?.token;
      const role = data.data?.role;
      const fullName = data.data?.fullName;
      const userEmail = data.data?.email;

      if (!token) {
        toast.error("No token received. Please try again.");
        setLoading(false);
        return;
      }

      if (role !== "admin") {
        toast.error("Access denied. Admin credentials required.");
        setLoading(false);
        return;
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          token,
          role,
          fullName,
          email: userEmail,
        }),
      );

      console.log("Saved to localStorage");
      console.log(
        " adminToken:",
        localStorage.getItem("adminToken") ? "SET" : "MISSING",
      );
      console.log(" adminUser:", localStorage.getItem("adminUser"));

      toast.success(`Welcome, ${fullName}!`);

      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error(" Login error:", error);
      console.error(" Response:", error.response?.data);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="flex items-center justify-center relative w-20 h-20 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg, #f093fb, #f5576c)" }}
          >
            <Image src="/logo.png" alt="logo" fill className="object-cover" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Admin Portal
          </h1>
          <p className="text-gray-400 mt-2">Burna Nation Betting</p>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
                placeholder="admin@betapp.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #34d399, #10b981)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
