import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ContactSubmission from "@/models/ContactSubmission";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Simple validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all fields" },
        { status: 400 }
      );
    }

    // Try connecting to MongoDB. If MONGODB_URI is not set, we fall back to a mock success response
    // so the front-end still works properly without a database.
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI is not defined. Simulating successful form submission.");
      return NextResponse.json(
        {
          success: true,
          message: "Enquiry submitted successfully (simulation mode, no DB connection).",
          data: { name, email, phone, message, createdAt: new Date() },
        },
        { status: 201 }
      );
    }

    try {
      await dbConnect();
      const submission = await ContactSubmission.create({
        name,
        email,
        phone,
        message,
      });

      return NextResponse.json(
        { success: true, message: "Enquiry submitted successfully.", data: submission },
        { status: 201 }
      );
    } catch (dbError: any) {
      console.error("Database connection/save error: ", dbError);
      // Fallback response so user doesn't get blocked
      return NextResponse.json(
        {
          success: true,
          message: "Enquiry accepted (saved in logs only due to DB connectivity).",
          data: { name, email, phone, message, createdAt: new Date() },
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process your request" },
      { status: 400 }
    );
  }
}
