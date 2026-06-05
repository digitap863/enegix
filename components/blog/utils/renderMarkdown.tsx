import React from "react";

/**
 * Renders the raw blog content exactly as written, preserving
 * all newlines, spaces, and indentation without markdown alteration.
 */
export function renderMarkdown(raw: string): React.ReactElement {
  const cleanRaw = raw.replace(/\\n/g, "\n");
  return (
    <div className="font-roboto text-gray-600 text-[13px] sm:text-[14px] leading-relaxed whitespace-pre-wrap break-words">
      {cleanRaw}
    </div>
  );
}
