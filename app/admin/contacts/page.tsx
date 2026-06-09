"use client";

import React, { useState, useEffect } from "react";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/contact/${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(enquiries.filter((e) => e._id !== deleteId));
        if (selectedEnquiry?._id === deleteId) {
          setSelectedEnquiry(null);
        }
        setDeleteId(null);
      } else {
        alert(data.error || "Failed to delete enquiry.");
      }
    } catch (err) {
      console.error("Delete enquiry error:", err);
      alert("An error occurred while deleting the enquiry.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredEnquiries = enquiries.filter((enq) => {
    return (
      enq.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="font-exo font-bold text-2xl text-slate-800">Customer Enquiries</h2>
        <p className="text-sm text-slate-500">Read and manage contact requests submitted through the Enegix website.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex gap-4 items-center justify-between shadow-xs">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search enquiries by name, email, phone or message content..."
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
      </div>

      {/* Enquiries Grid/Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 rounded w-full"></div>
            <div className="h-6 bg-slate-200 rounded w-full"></div>
            <div className="h-6 bg-slate-200 rounded w-full"></div>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <svg className="w-16 h-16 mx-auto text-slate-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm font-semibold">No enquiries found.</p>
            <p className="text-xs text-slate-400 mt-1">There are no records matching your query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Message Snippet</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredEnquiries.map((enq) => (
                  <tr
                    key={enq._id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedEnquiry(enq)}
                  >
                    <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">{enq.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-xs">
                        <span className="text-slate-600 font-medium">{enq.email}</span>
                        <span className="text-slate-400 mt-0.5">{enq.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 max-w-sm truncate">
                      {enq.message}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="inline-flex items-center justify-center p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-md transition-colors"
                        title="Read Full Message"
                      >
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteId(enq._id)}
                        className="inline-flex items-center justify-center p-1.5 bg-red-50 hover:bg-red-150 text-red-600 hover:text-red-800 rounded-md transition-colors"
                        title="Delete Enquiry"
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

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 animate-fade-in-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-exo font-bold text-lg text-slate-800">Enquiry Details</h4>
                <p className="text-xs text-slate-400">
                  Received on {new Date(selectedEnquiry.createdAt).toLocaleString("en-US")}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-md">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">From</span>
                <span className="font-semibold text-slate-800">{selectedEnquiry.name}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone Number</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="text-slate-750 font-medium hover:underline hover:text-[#4E9208]">
                  {selectedEnquiry.phone}
                </a>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-slate-750 font-medium hover:underline hover:text-[#4E9208]">
                  {selectedEnquiry.email}
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Message Body</span>
              <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-md whitespace-pre-wrap leading-relaxed border border-slate-100 font-sans">
                {selectedEnquiry.message}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => setDeleteId(selectedEnquiry._id)}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-650 hover:text-red-800 rounded-md text-sm font-semibold transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-3 text-red-600">
              <svg className="w-8 h-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h4 className="font-exo font-bold text-lg text-slate-800">Delete Enquiry?</h4>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Are you sure you want to delete this enquiry? This action cannot be undone.
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
