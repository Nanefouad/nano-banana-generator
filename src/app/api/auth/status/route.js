import { NextResponse } from "next/server";
import { isGoogleConfigured } from "@/lib/auth";

export async function GET(req) {
  const host =
    req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto =
    req.headers.get("x-forwarded-proto") ||
    (host?.includes("localhost") ? "http" : "https");

  const currentOrigin = host
    ? `${proto}://${host}`
    : process.env.APP_URL || "http://localhost:3000";

  const devUrl =
    process.env.APP_URL || "https://ais-dev-vk3zla5vngz4wvhpicqr7r-960826969391.europe-west2.run.app";
  const sharedUrl =
    devUrl.replace("ais-dev-", "ais-pre-");

  const devCallback = `${devUrl}/api/auth/callback/google`;
  const sharedCallback = `${sharedUrl}/api/auth/callback/google`;

  return NextResponse.json({
    googleConfigured: isGoogleConfigured,
    currentOrigin,
    callbackUrl: `${currentOrigin}/api/auth/callback/google`,
    devCallbackUrl: devCallback,
    sharedCallbackUrl: sharedCallback,
    devOrigin: devUrl,
    sharedOrigin: sharedUrl,
  });
}
