import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("enegix_admin_session");

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "No active session." },
        { status: 401 }
      );
    }

    const session = await verifyToken(sessionCookie.value);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session expired or invalid." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: { username: session.username },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "An error occurred." },
      { status: 500 }
    );
  }
}
