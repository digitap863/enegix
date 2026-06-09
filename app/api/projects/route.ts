import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch projects" },
      { status: 400 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Auto-generate projectCode if not provided
    if (!body.projectCode) {
      let isUnique = false;
      let generatedCode = "";
      while (!isUnique) {
        generatedCode = `P-${Math.floor(100000 + Math.random() * 900000)}`;
        const existing = await Project.findOne({ projectCode: generatedCode });
        if (!existing) {
          isUnique = true;
        }
      }
      body.projectCode = generatedCode;
    }

    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create project" },
      { status: 400 }
    );
  }
}
