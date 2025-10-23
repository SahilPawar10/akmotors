"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/providers/store";
import loginBackground from "../../public/LandingPage/loginbg_files/male-mechanic-repairs-amotorcycle-motor-260nw-2313911341.jpg";
import { LoginUser, registerUser, selectAuthUser } from "@/slices/authSlice";

export default function RegisterPage() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { authStatus, data, error } = useSelector(selectAuthUser);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const payload = {
      number: mobile,
      password,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    setLoading(true);
    try {
      await dispatch(LoginUser({ payload, headers })).unwrap();
      // Reset form after successful registration
      setMobile("");
      setPassword("");
      router.push("/admin");
    } catch (err) {
      setMessage({ type: "error", text: err as string });
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold text-rose-500 mb-6">Log In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Inputs */}

          <div className="text-left">
            <label className="block text-sm font-medium mb-1">Mobile No</label>
            <input
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="w-full px-3 py-2 border-b-2 border-rose-400 focus:outline-none focus:border-rose-600 bg-transparent text-gray-700"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border-b-2 border-rose-400 focus:outline-none focus:border-rose-600 bg-transparent text-gray-700"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 ${
              loading
                ? "bg-rose-300 cursor-not-allowed"
                : "bg-rose-400 hover:bg-rose-500"
            } text-white py-2 rounded-lg font-medium transition`}
          >
            {loading ? (
              <>
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Log In...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Message box */}
        {message && (
          <div
            className={`mt-4 p-2 rounded-md text-sm font-medium ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <p className="text-sm mt-4 text-gray-700">
          New to AK Motors?{" "}
          <Link href="/register" className="text-rose-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
