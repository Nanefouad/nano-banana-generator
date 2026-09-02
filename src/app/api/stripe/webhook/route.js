import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { BillingService } from "@/lib/services/billing";

export async function POST(req) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature =
      req.headers.get("stripe-signature") ||
      headersList.get("stripe-signature") ||
      headersList.get("Stripe-Signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    await BillingService.handleWebhook(body, signature);
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("[STRIPE_WEBHOOK]", error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
}
