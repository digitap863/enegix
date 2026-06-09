const secret = process.env.ADMIN_SESSION_SECRET || "enegix_super_secret_admin_session_signing_key_2026_abcedf";

export interface AdminSession {
  username: string;
  expiresAt: number;
}

export async function signToken(payload: AdminSession): Promise<string> {
  const data = JSON.stringify(payload);
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const payloadBase64 = btoa(data);
  return `${payloadBase64}.${signatureHex}`;
}

export async function verifyToken(token: string): Promise<AdminSession | null> {
  try {
    const [payloadBase64, signatureHex] = token.split(".");
    if (!payloadBase64 || !signatureHex) return null;
    const dataStr = atob(payloadBase64);
    const payload = JSON.parse(dataStr) as AdminSession;

    // Check expiry
    if (Date.now() > payload.expiresAt) return null;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    
    // Parse hex signature string to bytes
    const match = signatureHex.match(/.{1,2}/g);
    if (!match) return null;
    const signatureBytes = new Uint8Array(
      match.map((byte) => parseInt(byte, 16))
    );
    
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      encoder.encode(dataStr)
    );
    
    return isValid ? payload : null;
  } catch (error) {
    console.error("Session verification failed:", error);
    return null;
  }
}
