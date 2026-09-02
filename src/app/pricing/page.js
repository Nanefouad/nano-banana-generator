"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Footer from "@/components/Footer";
import { Check, Zap, Sparkles, ShieldCheck } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const PLANS = [
  {
    id: "basic",
    name: "Starter Pack",
    price: "$5",
    credits: 100,
    description: "Ideal for testing initial concepts and lightweight generation.",
  },
  {
    id: "standard",
    name: "Studio Pack",
    price: "$10",
    credits: 250,
    description: "Designed for active creators exploring high-resolution outputs.",
  },
  {
    id: "pro",
    name: "Pro Studio",
    price: "$20",
    credits: 600,
    description: "Maximum efficiency for intensive artifact generation & remixes.",
    popular: true,
  },
  {
    id: "business",
    name: "Scale Team",
    price: "$50",
    credits: 2000,
    description: "High-throughput capacity for continuous production runs.",
  },
];

export default function Pricing() {
  const { status } = useSession();
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleCheckout = async (planId) => {
    if (status !== "authenticated") {
      toast.error("Please sign in to purchase generation credits.");
      return;
    }

    setLoadingPlan(planId);
    try {
      const { data } = await axios.post("/api/checkout", { planId });
      if (data.url) {
        window.location.assign(data.url);
      } else {
        throw new Error("No redirection URL returned");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error || "Failed to initiate Stripe checkout."
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col opendesign-canvas-grid select-none text-[#fafafa] overflow-hidden">
      <Toaster position="top-right" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col gap-10 overflow-y-auto scrollbar-subtle items-center">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181b] border border-[#2c2c31] rounded-full">
            <Zap className="w-3.5 h-3.5 text-[#87ea5c]" />
            <span className="text-[10px] font-mono font-medium text-[#87ea5c] uppercase tracking-wider">
              Studio Capacity
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#fafafa]">
            Generation Credit Packs
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
            Pay-as-you-go credits for high-resolution image synthesis and generative remixes. No recurring subscription lock-in.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-[#18181b] border rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-200 hover:-translate-y-1 ${
                plan.popular
                  ? "border-[#87ea5c] shadow-xl shadow-[#87ea5c]/5"
                  : "border-[#2c2c31] hover:border-[#3f3f46]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#87ea5c] text-[#09090b] text-[10px] font-bold uppercase px-3 py-0.5 rounded-full tracking-wider shadow-sm">
                  Recommended
                </span>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[#fafafa]">{plan.price}</span>
                    <span className="text-xs text-[#71717a]">one-time</span>
                  </div>
                </div>

                <div className="text-xs bg-[#121214] border border-[#2c2c31] py-2 px-3 rounded-lg text-center font-mono font-semibold text-[#87ea5c]">
                  {plan.credits} Credits Included
                </div>

                <p className="text-xs text-[#a1a1aa] leading-relaxed min-h-[2.5rem]">
                  {plan.description}
                </p>

                <ul className="space-y-2.5 border-t border-[#26262b] pt-4 text-xs text-[#a1a1aa]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#87ea5c]" />
                    <span>All aspect ratio formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#87ea5c]" />
                    <span>1K, 2K & 4K resolutions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#87ea5c]" />
                    <span>Credits never expire</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loadingPlan !== null}
                className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none ${
                  plan.popular
                    ? "opendesign-btn-primary shadow-sm"
                    : "bg-[#222226] hover:bg-[#2c2c31] text-[#fafafa] border border-[#3f3f46]"
                }`}
              >
                {loadingPlan === plan.id ? "Redirecting..." : "Acquire Pack"}
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#18181b] border border-[#2c2c31] text-xs text-[#a1a1aa]">
          <ShieldCheck className="w-4 h-4 text-[#87ea5c]" />
          <span>Encrypted payment processing via Stripe. Unlimited usage when Bring-Your-Own-Key is active.</span>
        </div>
      </main>

      <Footer />
    </div>
  );
}
