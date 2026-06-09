import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded." },
        { status: 400 }
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret || cloudName === "your_cloud_name") {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary is not configured. Please set your credentials in .env.local.",
        },
        { status: 500 }
      );
    }

    // Convert file to base64 data URL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const timestamp = Math.round(Date.now() / 1000).toString();
    
    // Sort parameters alphabetically to sign
    const signatureInput = `timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureInput)
      .digest("hex");

    // Assemble form data for Cloudinary
    const uploadForm = new FormData();
    uploadForm.append("file", fileBase64);
    uploadForm.append("api_key", apiKey);
    uploadForm.append("timestamp", timestamp);
    uploadForm.append("signature", signature);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: uploadForm,
    });

    const data = await res.json();

    if (data.error) {
      return NextResponse.json(
        { success: false, error: data.error.message || "Cloudinary upload failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      url: data.secure_url,
    });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process upload." },
      { status: 500 }
    );
  }
}
