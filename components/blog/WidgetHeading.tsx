import React from "react";

export default function WidgetHeading({ title }: { title: string }) {
  return (
    <div className="mb-4">
      <h3 className="font-exo font-bold text-[#011540] text-[13px] uppercase tracking-[0.15em]">{title}</h3>
      <div className="flex items-center gap-0 mt-1.5">
        <div className="h-[3px] w-8 bg-[#72D210] rounded-full" />
        <div className="h-[3px] w-3 bg-[#72D210]/40 rounded-full ml-0.5" />
      </div>
    </div>
  );
}
