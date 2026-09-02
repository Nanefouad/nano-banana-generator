import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const CANONICAL_URL = "https://image.soook.fr";

function syncNextAuthUrl(req) {
  try {
    const host =
      req?.headers?.get("x-forwarded-host") ||
      req?.headers?.get("host");
    const proto =
      req?.headers?.get("x-forwarded-proto") ||
      (host?.includes("localhost") ? "http" : "https");

    if (host && !host.includes("localhost")) {
      process.env.NEXTAUTH_URL = `${proto}://${host}`;
    } else if (process.env.VERCEL_URL) {
      process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.APP_URL && !process.env.APP_URL.includes("localhost")) {
      process.env.NEXTAUTH_URL = process.env.APP_URL;
    } else {
      process.env.NEXTAUTH_URL = CANONICAL_URL;
    }
  } catch (err) {
    process.env.NEXTAUTH_URL = process.env.APP_URL || CANONICAL_URL;
  }
}

export async function GET(req, ctx) {
  syncNextAuthUrl(req);
  return NextAuth(authOptions)(req, ctx);
}

export async function POST(req, ctx) {
  syncNextAuthUrl(req);
  return NextAuth(authOptions)(req, ctx);
}

