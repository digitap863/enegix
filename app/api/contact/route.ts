import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ContactSubmission from "@/models/ContactSubmission";
import nodemailer from "nodemailer";

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

    // Helper function to send email notification
    const sendNotificationEmail = async () => {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Email credentials not configured. Skipping email notification.");
        return;
      }
      
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || "smtp.gmail.com",
          port: Number(process.env.EMAIL_PORT) || 587,
          secure: process.env.EMAIL_SECURE === "true",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"Enegix Website" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
          subject: `New Contact Enquiry from ${name}`,
          text: `You have a new contact form submission.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
          html: `<p><strong>New Contact Enquiry</strong></p>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Phone:</strong> ${phone}</p>
                 <p><strong>Message:</strong><br/>${message}</p>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Notification email sent successfully");
      } catch (emailError) {
        console.error("Error sending notification email: ", emailError);
      }
    };

    // Try connecting to MongoDB. If MONGODB_URI is not set, we fall back to a mock success response
    // so the front-end still works properly without a database.
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI is not defined. Simulating successful form submission.");
      await sendNotificationEmail(); // Still try to send email
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

      // Send email after successful save
      await sendNotificationEmail();

      return NextResponse.json(
        { success: true, message: "Enquiry submitted successfully.", data: submission },
        { status: 201 }
      );
    } catch (dbError: any) {
      console.error("Database connection/save error: ", dbError);
      
      // Fallback response so user doesn't get blocked
      // We still try to send the email so the lead is not lost
      await sendNotificationEmail();
      
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
