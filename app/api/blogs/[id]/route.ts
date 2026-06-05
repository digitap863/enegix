import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import BlogPost from "@/models/BlogPost";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;
    
    let post;
    // Check if ID is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await BlogPost.findById(id);
    } else {
      // If not a valid ObjectId, look up by slug
      post = await BlogPost.findOne({ slug: id });
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch blog post" },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    
    let post;
    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await BlogPost.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
    } else {
      post = await BlogPost.findOneAndUpdate({ slug: id }, body, {
        new: true,
        runValidators: true,
      });
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update blog post" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;
    
    let post;
    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await BlogPost.findByIdAndDelete(id);
    } else {
      post = await BlogPost.findOneAndDelete({ slug: id });
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { id: post._id } });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete blog post" },
      { status: 400 }
    );
  }
}
