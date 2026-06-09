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
      const projects = await Project.find({}, { projectCode: 1 });
      let maxNum = 0;
      projects.forEach((p) => {
        if (p.projectCode && p.projectCode.startsWith("P-")) {
          const numPart = p.projectCode.substring(2);
          const parsed = parseInt(numPart, 10);
          if (!isNaN(parsed) && parsed > maxNum) {
            maxNum = parsed;
          }
        }
      });
      const nextNum = maxNum + 1;
      const formattedNum = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
      body.projectCode = `P-${formattedNum}`;
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
