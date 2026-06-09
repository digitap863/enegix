"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface BlogPost {
  _id: string;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  createdAt: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blogs/${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== deleteId));
        setDeleteId(null);
      } else {
        alert(data.error || "Failed to delete blog article.");
      }
    } catch (err) {
      console.error("Delete blog error:", err);
      alert("An error occurred while deleting the blog.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Get unique categories for filter
  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category || "Uncategorized")))];

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-exo font-bold text-2xl text-slate-800">Manage Blogs</h2>
          <p className="text-sm text-slate-500">Create, edit, and delete news articles or announcements.</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 bg-[#4E9208] hover:bg-[#3a6f06] text-white text-sm font-bold px-4 py-2.5 rounded-md shadow-xs transition-colors self-start sm:self-auto"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Article</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
        <div className="w-full md:max-w-md relative">
          <input
            type="text"
            placeholder="Search articles by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 focus:outline-none focus:border-[#72D210] focus:ring-1 focus:ring-[#72D210]/20 placeholder-slate-400"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto justify-end">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#72D210]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blogs Listing Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 rounded w-full"></div>
            <div className="h-6 bg-slate-200 rounded w-full"></div>
            <div className="h-6 bg-slate-200 rounded w-full"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <svg className="w-16 h-16 mx-auto text-slate-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-sm font-semibold">No articles found.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting your search query or add a new blog article.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Read Time</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        {blog.image && (
                          <div className="w-12 h-10 rounded overflow-hidden relative shrink-0 border border-slate-100 bg-slate-100 hidden sm:block">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="truncate">
                          <p className="font-semibold text-slate-800 truncate">{blog.title}</p>
                          <span className="text-[10px] text-slate-400 truncate block">slug: {blog.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-xs text-xs font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${blog.categoryColor || "#72D210"}15`,
                          color: blog.categoryColor || "#72D210",
                        }}
                      >
                        {blog.category || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {blog.date ? new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{blog.readTime || "5 min read"}</td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/admin/blogs/new?edit=${blog._id}`}
                        className="inline-flex items-center justify-center p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-md transition-colors"
                        title="Edit Article"
                      >
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => setDeleteId(blog._id)}
                        className="inline-flex items-center justify-center p-1.5 bg-red-50 hover:bg-red-150 text-red-600 hover:text-red-800 rounded-md transition-colors"
                        title="Delete Article"
                      >
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-3 text-red-600">
              <svg className="w-8 h-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h4 className="font-exo font-bold text-lg text-slate-800">Delete Blog Article?</h4>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Are you sure you want to delete this blog post? This action is permanent and cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="px-4 py-2 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-md text-sm font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-750 text-white rounded-md text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
