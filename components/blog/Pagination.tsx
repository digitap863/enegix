import React from "react";

export default function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center gap-1.5 mt-8">
      <button
        type="button"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-sm border text-[11px] font-roboto font-semibold uppercase tracking-wider transition-all ${current === 1 ? "border-gray-200 text-gray-300 cursor-not-allowed bg-white" : "border-gray-300 text-gray-500 bg-white hover:border-[#72D210] hover:text-[#4E9208]"}`}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Prev
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onChange(page)}
          className={`w-8 h-8 rounded-sm border text-[12px] font-roboto font-semibold transition-all ${page === current ? "bg-[#011540] text-white border-[#011540]" : "bg-white text-gray-500 border-gray-200 hover:border-[#72D210] hover:text-[#4E9208]"}`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-sm border text-[11px] font-roboto font-semibold uppercase tracking-wider transition-all ${current === total ? "border-gray-200 text-gray-300 cursor-not-allowed bg-white" : "border-gray-300 text-gray-500 bg-white hover:border-[#72D210] hover:text-[#4E9208]"}`}
      >
        Next
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
