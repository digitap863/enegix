import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ContactSubmission from "@/models/ContactSubmission";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;
    const submission = await ContactSubmission.findByIdAndDelete(id);

    if (!submission) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { id } });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete enquiry" },
      { status: 400 }
    );
  }
}
