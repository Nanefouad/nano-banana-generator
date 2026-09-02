import { NextResponse } from "next/server";
import { isGoogleConfigured, CANONICAL_DOMAIN, CANONICAL_URL } from "@/lib/auth";

export async function GET(req) {
  const host =
    req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto =
    req.headers.get("x-forwarded-proto") ||
    (host?.includes("localhost") ? "http" : "https");

  const currentOrigin = host
    ? `${proto}://${host}`
    : process.env.APP_URL || CANONICAL_URL;

  const devUrl =
    process.env.APP_URL || "https://ais-dev-vk3zla5vngz4wvhpicqr7r-960826969391.europe-west2.run.app";
  const sharedUrl =
    devUrl.replace("ais-dev-", "ais-pre-");

  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  const vercelCallback = vercelUrl ? `${vercelUrl}/api/auth/callback/google` : null;

  const canonicalCallback = `${CANONICAL_URL}/api/auth/callback/google`;
  const devCallback = `${devUrl}/api/auth/callback/google`;
  const sharedCallback = `${sharedUrl}/api/auth/callback/google`;
  const currentCallback = `${currentOrigin}/api/auth/callback/google`;

  return NextResponse.json({
    googleConfigured: isGoogleConfigured,
    canonicalDomain: CANONICAL_DOMAIN,
    canonicalUrl: CANONICAL_URL,
    canonicalCallbackUrl: canonicalCallback,
    currentOrigin,
    callbackUrl: currentCallback,
    devCallbackUrl: devCallback,
    sharedCallbackUrl: sharedCallback,
    vercelCallbackUrl: vercelCallback,
    vercelOrigin: vercelUrl,
    devOrigin: devUrl,
    sharedOrigin: sharedUrl,
  });
}
