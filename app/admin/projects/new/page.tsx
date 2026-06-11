"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const projectCategories = ["MEDICAL", "FUEL&OIL", "LABORATORY", "LPG"];

function ProjectFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = !!editId;

  const [title, setTitle] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [category, setCategory] = useState("LPG");
  const [year, setYear] = useState<number | "">(new Date().getFullYear());
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(isEditMode);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${editId}`);
        const data = await res.json();
        if (res.ok && data.success) {
          const project = data.data;
          setTitle(project.title || "");
          setProjectCode(project.projectCode || "");
          setCategory(project.category || "LPG");
          setYear(project.year ?? "");
          setClient(project.client || "");
          setLocation(project.location || "");
          setDescription(project.description || "");
          setImageUrl(project.image || "");
        } else {
          setFormError("Failed to load project details.");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setFormError("An error occurred while loading project details.");
      } finally {
        setIsLoadingProject(false);
      }
    };

    fetchProject();
  }, [editId, isEditMode]);

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

    const payload = {
      title,
      projectCode,
      category,
      year: year !== "" ? Number(year) : undefined,
      client,
      location,
      description,
      image: imageUrl,
    };

    try {
      const url = isEditMode ? `/api/projects/${editId}` : "/api/projects";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        setFormError(data.error || "Failed to save the project.");
      }
    } catch (err) {
      console.error("Submit project form error:", err);
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingProject) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-t-[#72D210] border-slate-200 rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm">Loading project details...</p>
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
        <Link href="/admin/projects" className="hover:text-slate-600 transition-colors">Projects</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">{isEditMode ? "Edit Project" : "New Project"}</span>
      </div>

      <div>
        <h2 className="font-exo font-bold text-2xl text-slate-800">{isEditMode ? "Edit Project" : "Create Project Listing"}</h2>
        <p className="text-sm text-slate-500">
          {isEditMode ? "Update the attributes of this project." : "Add a completed or current engineering project to the portfolio."}
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6 bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Centralized LPG Network for Nad Al Hamar"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-black text-sm focus:outline-none focus:border-[#72D210] focus:ring-1 focus:ring-[#72D210]/20"
              />
            </div>



            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-black text-sm focus:outline-none focus:border-[#72D210]"
              >
                {projectCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Client */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Client Name</label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="E.g., Dubai Properties"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-black text-sm focus:outline-none focus:border-[#72D210] focus:ring-1 focus:ring-[#72D210]/20"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Year Completed</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-black text-sm focus:outline-none focus:border-[#72D210] focus:ring-1 focus:ring-[#72D210]/20"
              />
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="E.g., Nad Al Hamar, Dubai, UAE"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-black text-sm focus:outline-none focus:border-[#72D210] focus:ring-1 focus:ring-[#72D210]/20"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Description</label>
            <textarea
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the project deliverables, materials, scope of work, etc."
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-black text-sm focus:outline-none focus:border-[#72D210] focus:ring-1 focus:ring-[#72D210]/20"
            />
          </div>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-6">
          
          {/* Image Upload Block */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
            <h4 className="font-exo font-bold text-slate-800 border-b border-slate-100 pb-3">Project Banner Image</h4>
            
            <div className="relative border-2 border-dashed border-slate-200 rounded-md p-4 text-center hover:border-[#72D210]/50 transition-colors group min-h-[160px] flex flex-col justify-center items-center bg-slate-50 overflow-hidden">
              {isUploading ? (
                <div className="flex flex-col items-center gap-2 z-20">
                  <div className="w-8 h-8 border-2 border-slate-300 border-t-[#72D210] rounded-full animate-spin"></div>
                  <span className="text-xs text-slate-400">Uploading to Cloudinary...</span>
                </div>
              ) : imageUrl ? (
                <>
                  {/* Image Preview */}
                  <img src={imageUrl} alt="Project Preview" className="absolute inset-0 w-full h-full object-cover z-0" />
                  
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
                  <p className="text-xs font-semibold text-slate-600">Click to upload banner image</p>
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

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/projects"
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
                <span>Save Project</span>
              )}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default function AdminProjectFormPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-t-[#72D210] border-slate-200 rounded-full animate-spin"></div>
      </div>
    }>
      <ProjectFormContent />
    </Suspense>
  );
}
