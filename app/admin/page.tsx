"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  linkText: string;
  linkHref: string;
}

function StatCard({ title, value, icon, color, linkText, linkHref }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</span>
          <h3 className="text-3xl font-extrabold mt-1 text-slate-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color} text-white`}>
          {icon}
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-slate-100">
        <Link href={linkHref} className="text-xs font-bold text-[#4E9208] hover:text-[#3a6f06] inline-flex items-center gap-1">
          <span>{linkText}</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [blogsCount, setBlogsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsRes, projectsRes, contactsRes] = await Promise.all([
          fetch("/api/blogs"),
          fetch("/api/projects"),
          fetch("/api/contact"),
        ]);

        const blogsData = await blogsRes.json();
        const projectsData = await projectsRes.json();
        const contactsData = await contactsRes.json();

        if (blogsData.success) setBlogsCount(blogsData.data.length);
        if (projectsData.success) setProjectsCount(projectsData.data.length);
        if (contactsData.success) setEnquiries(contactsData.data);
      } catch (err) {
        console.error("Failed to load statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-slate-200 rounded-lg"></div>
          <div className="h-32 bg-slate-200 rounded-lg"></div>
          <div className="h-32 bg-slate-200 rounded-lg"></div>
        </div>
        <div className="h-64 bg-slate-200 rounded-lg mt-8"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="font-exo font-bold text-2xl text-slate-800">Dashboard Overview</h2>
        <p className="text-sm text-slate-500">Welcome to your site administrator dashboard.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Projects"
          value={projectsCount}
          color="bg-[#001729]"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
          linkText="Manage Projects"
          linkHref="/admin/projects"
        />

        <StatCard
          title="Blog Articles"
          value={blogsCount}
          color="bg-[#4E9208]"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          }
          linkText="Manage Blogs"
          linkHref="/admin/blogs"
        />

        <StatCard
          title="Customer Enquiries"
          value={enquiries.length}
          color="bg-[#001E52]"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          linkText="Review Enquiries"
          linkHref="/admin/contacts"
        />
      </div>

      {/* Recent Enquiries Block */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-exo font-bold text-slate-800 text-lg">Recent Customer Enquiries</h3>
          <Link href="/admin/contacts" className="text-xs font-bold text-[#4E9208] hover:underline">
            View All Enquiries
          </Link>
        </div>

        {enquiries.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <svg className="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm">No enquiries found. All quiet for now!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contact Detail</th>
                  <th className="px-6 py-4">Short Message</th>
                  <th className="px-6 py-4">Date Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{enq.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-xs">
                        <span className="text-slate-600 font-medium">{enq.email}</span>
                        <span className="text-slate-400 mt-0.5">{enq.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                      {enq.message}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(enq.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
