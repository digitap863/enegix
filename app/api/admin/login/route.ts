import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signToken } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (username !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }

    // Session duration: 2 hours
    const expiresAt = Date.now() + 2 * 60 * 60 * 1000;
    const token = await signToken({ username, expiresAt });

    const cookieStore = await cookies();
    cookieStore.set({
      name: "enegix_admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(expiresAt),
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Authentication successful.",
      user: { username },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "An error occurred during login." },
      { status: 500 }
    );
  }
}
