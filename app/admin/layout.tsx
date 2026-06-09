"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Skip layout shell for login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/verify");
        const data = await res.json();
        if (res.ok && data.success) {
          setAdminUser(data.user.username);
        } else {
          // If session verification failed, redirect to login
          router.push("/admin/login");
        }
      } catch (err) {
        console.error("Session check error:", err);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-[#72D210] border-slate-700 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-exo tracking-wider">Verifying session...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      name: "Blogs",
      href: "/admin/blogs",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      name: "Enquiries",
      href: "/admin/contacts",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-roboto">
      {/* ── SIDEBAR DESKTOP ── */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-slate-900 text-white shrink-0 border-r border-slate-800">
        {/* Brand Header */}
        <div className="flex items-center gap-3 h-20 px-6 bg-slate-950 border-b border-slate-850">
          <div className="bg-[#72D210] p-1.5 rounded-sm">
            <span className="font-exo font-bold text-slate-950 text-xl tracking-wider">E</span>
          </div>
          <div>
            <h1 className="font-exo font-bold text-lg leading-none text-white tracking-wide">ENEGIX</h1>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Admin Panel</span>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm font-medium ${
                  isActive
                    ? "bg-[#72D210] text-slate-950 shadow-md shadow-[#72D210]/20 font-semibold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom profile / logout */}
        <div className="p-4 bg-slate-950 border-t border-slate-850 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-[#72D210] uppercase border border-slate-700">
              {adminUser ? adminUser[0] : "A"}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold leading-none text-slate-200">{adminUser || "Administrator"}</p>
              <span className="text-[10px] text-slate-400">admin account</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
            title="Log Out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </aside>

      {/* ── MOBILE DRAWER SIDEBAR ── */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          mobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          onClick={() => setMobileSidebarOpen(false)}
        />
        
        {/* Drawer contents */}
        <aside
          className={`absolute left-0 top-0 bottom-0 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 transform ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-20 px-6 bg-slate-950 border-b border-slate-850">
            <div className="flex items-center gap-3">
              <div className="bg-[#72D210] p-1.5 rounded-sm">
                <span className="font-exo font-bold text-slate-950 text-xl">E</span>
              </div>
              <div>
                <h1 className="font-exo font-bold text-lg text-white">ENEGIX</h1>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Admin Panel</span>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm font-medium ${
                    isActive
                      ? "bg-[#72D210] text-slate-950 font-semibold shadow-md shadow-[#72D210]/20"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 bg-slate-950 border-t border-slate-850 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-[#72D210] uppercase">
                {adminUser ? adminUser[0] : "A"}
              </div>
              <div className="truncate max-w-[120px]">
                <p className="text-xs font-semibold leading-none text-slate-200">{adminUser || "Admin"}</p>
                <span className="text-[10px] text-slate-400">admin account</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-red-400"
              title="Log Out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </aside>
      </div>

      {/* ── MAIN CONTENT WORKSPACE ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 md:justify-end">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-700 md:hidden focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* User actions / date header */}
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="hidden sm:inline">
              Today: {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="sm:hidden">
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#4E9208] hover:text-[#3a6f06] font-semibold"
            >
              <span>View Site</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </header>

        {/* Content canvas */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
