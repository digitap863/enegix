"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function BlogFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = !!editId;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("General");
  const [categoryColor, setCategoryColor] = useState("#4E9208");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [readTime, setReadTime] = useState("5 min read");
  const [tagsInput, setTagsInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoadingBlog, setIsLoadingBlog] = useState(isEditMode);

  const colorPresets = [
    { name: "Green (Corp)", value: "#4E9208" },
    { name: "Light Green", value: "#72D210" },
    { name: "Deep Blue", value: "#001729" },
    { name: "Secondary Blue", value: "#005691" },
    { name: "Orange", value: "#ea580c" },
    { name: "Purple", value: "#7c3aed" },
  ];

  useEffect(() => {
    if (!isEditMode) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${editId}`);
        const data = await res.json();
        if (res.ok && data.success) {
          const blog = data.data;
          setTitle(blog.title || "");
          setSlug(blog.slug || "");
          setCategory(blog.category || "General");
          setCategoryColor(blog.categoryColor || "#4E9208");
          setContent(blog.content || "");
          if (blog.date) {
            setDate(new Date(blog.date).toISOString().split("T")[0]);
          }
          setReadTime(blog.readTime || "5 min read");
          setTagsInput(blog.tags ? blog.tags.join(", ") : "");
          setImageUrl(blog.image || "");
        } else {
          setFormError("Failed to load the article details.");
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setFormError("An error occurred while loading the article.");
      } finally {
        setIsLoadingBlog(false);
      }
    };

    fetchBlog();
  }, [editId, isEditMode]);

  // Handle title changes to auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    // Auto-generate slug
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  };

  // Image upload handler (Cloudinary)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", fileList[0]);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setImageUrl(data.url);
      } else {
        setUploadError(data.error || "Failed to upload image.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("Network error. Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const payload = {
      title,
      slug,
      category,
      categoryColor,
      content,
      date,
      readTime,
      tags,
      image: imageUrl,
    };

    try {
      const url = isEditMode ? `/api/blogs/${editId}` : "/api/blogs";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        setFormError(data.error || "Failed to save the article.");
      }
    } catch (err) {
      console.error("Submit blog form error:", err);
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingBlog) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-t-[#72D210] border-slate-200 rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm">Loading article details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb / Header */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/admin" className="hover:text-slate-600 transition-colors">Admin</Link>
        <span>/</span>
        <Link href="/admin/blogs" className="hover:text-slate-600 transition-colors">Blogs</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">{isEditMode ? "Edit Article" : "New Article"}</span>
      </div>

      <div>
        <h2 className="font-exo font-bold text-2xl text-slate-800">{isEditMode ? "Edit Blog Article" : "Create Blog Article"}</h2>
        <p className="text-sm text-slate-500">
          {isEditMode ? "Modify parameters for this published article." : "Create and publish a new article for your website."}
        </p>
      </div>

      {formError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{formError}</span>
        </div>
      )}

      {/* Main Form Box */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Input Fields */}
        <div className="lg:col-span-2 space-y-6 bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="E.g., Expanding our LPG Services in the UAE"
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-black text-sm focus:outline-none focus:border-[#72D210] focus:ring-1 focus:ring-[#72D210]/20"
            />
          </div>



          {/* Content Body */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Article Body Content</label>
            <textarea
              rows={16}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here... Supports plain text or HTML formatting."
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-black text-sm focus:outline-none focus:border-[#72D210] focus:ring-1 focus:ring-[#72D210]/20 font-mono"
            />
          </div>
        </div>

        {/* Right 1 Column: Metadata & Image */}
        <div className="space-y-6">
          
          {/* Metadata Block */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-5">
            <h4 className="font-exo font-bold text-slate-800 border-b border-slate-100 pb-3">Article Metadata</h4>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category Name</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="E.g., LPG Systems, Medical, Safety"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:border-[#72D210]"
              />
            </div>

            {/* Category Color */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category Tag Color</label>
              <div className="grid grid-cols-6 gap-2 mb-3">
                {colorPresets.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setCategoryColor(color.value)}
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 shrink-0"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {categoryColor === color.value && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={categoryColor}
                  onChange={(e) => setCategoryColor(e.target.value)}
                  className="w-8 h-8 border-0 p-0 cursor-pointer shrink-0 rounded-xs"
                />
                <input
                  type="text"
                  value={categoryColor}
                  onChange={(e) => setCategoryColor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Publish Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:border-[#72D210]"
              />
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Read Time Estimate</label>
              <input
                type="text"
                required
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="E.g., 5 min read"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:border-[#72D210]"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="LPG, Safety, UAE, Technology"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:border-[#72D210]"
              />
            </div>
          </div>

          {/* Image Upload Block */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
            <h4 className="font-exo font-bold text-slate-800 border-b border-slate-100 pb-3">Featured Image</h4>
            
            <div className="relative border-2 border-dashed border-slate-200 rounded-md p-4 text-center hover:border-[#72D210]/50 transition-colors group min-h-[160px] flex flex-col justify-center items-center bg-slate-50 overflow-hidden">
              {isUploading ? (
                <div className="flex flex-col items-center gap-2 z-20">
                  <div className="w-8 h-8 border-2 border-slate-300 border-t-[#72D210] rounded-full animate-spin"></div>
                  <span className="text-xs text-slate-400">Uploading to Cloudinary...</span>
                </div>
              ) : imageUrl ? (
                <>
                  {/* Image Preview */}
                  <img src={imageUrl} alt="Featured Preview" className="absolute inset-0 w-full h-full object-cover z-0" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-10 pointer-events-none">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 017.75 0z" />
                    </svg>
                    <p className="text-xs font-semibold text-white">Click or drag to change image</p>
                  </div>
                </>
              ) : (
                <div className="space-y-2 z-0">
                  <svg className="w-8 h-8 mx-auto text-slate-350" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 017.75 0z" />
                  </svg>
                  <p className="text-xs font-semibold text-slate-600">Click to upload featured image</p>
                  <p className="text-[10px] text-slate-400">PNG, JPG or WEBP up to 5MB</p>
                </div>
              )}

              {/* The File Input — covers everything else except the remove button */}
              {!isUploading && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
              )}

              {/* Remove Button in corner — z-30 to stay on top of the file input */}
              {imageUrl && !isUploading && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setImageUrl("");
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors z-30 shadow-md"
                  title="Remove Image"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>

            {imageUrl && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-600 focus:outline-none focus:border-[#72D210]"
                  placeholder="Image URL"
                />
              </div>
            )}
            
            {uploadError && (
              <p className="text-xs text-red-500 font-semibold leading-tight">{uploadError}</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blogs"
              className="w-1/2 border border-slate-200 text-slate-500 hover:bg-slate-50 font-exo font-bold py-3 text-center rounded-md text-sm transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="w-1/2 bg-[#4E9208] hover:bg-[#3a6f06] disabled:bg-[#4E9208]/50 text-white font-exo font-bold py-3 rounded-md text-sm transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>Publish</span>
              )}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default function AdminBlogFormPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-t-[#72D210] border-slate-200 rounded-full animate-spin"></div>
      </div>
    }>
      <BlogFormContent />
    </Suspense>
  );
}
