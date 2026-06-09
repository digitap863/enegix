"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed.");
      }
    } catch (err) {
      console.error("Login request error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001729] font-roboto px-4 sm:px-6 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#72D210]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#001E52] blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-lg shadow-2xl relative z-10">
        {/* Logo and Headings */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="bg-[#72D210] px-2.5 py-1.5 rounded-sm">
              <span className="font-exo font-bold text-slate-950 text-2xl tracking-wider">E</span>
            </div>
            <span className="font-exo font-extrabold text-2xl text-white tracking-widest">ENEGIX</span>
          </div>
          <p className="text-sm text-slate-400 font-medium tracking-wide">
            Sign in to access the administrator dashboard
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 rounded-md flex items-start gap-2.5 text-red-200 text-sm leading-relaxed">
            <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              disabled={loading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-md px-4 py-3 text-white text-sm focus:outline-none focus:border-[#72D210] focus:ring-1 focus:ring-[#72D210]/50 placeholder-slate-600 transition-all"
              placeholder="Enter admin username"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-md px-4 py-3 text-white text-sm focus:outline-none focus:border-[#72D210] focus:ring-1 focus:ring-[#72D210]/50 placeholder-slate-600 transition-all"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#4E9208] hover:bg-[#3a6f06] disabled:bg-[#4E9208]/50 text-white font-exo font-bold py-3 px-4 rounded-md tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
