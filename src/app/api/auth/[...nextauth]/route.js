import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

function syncNextAuthUrl(req) {
  try {
    const host =
      req?.headers?.get("x-forwarded-host") ||
      req?.headers?.get("host");
    const proto =
      req?.headers?.get("x-forwarded-proto") ||
      (host?.includes("localhost") ? "http" : "https");

    if (host) {
      process.env.NEXTAUTH_URL = `${proto}://${host}`;
    } else if (process.env.APP_URL) {
      process.env.NEXTAUTH_URL = process.env.APP_URL;
    }
  } catch (err) {
    if (process.env.APP_URL) {
      process.env.NEXTAUTH_URL = process.env.APP_URL;
    }
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

