import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

export default stripe;
import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  }

  stripeClient ??= new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });

  return stripeClient;
}

export const PACKAGES = {
  starter: {
    name: "Starter Pack",
    price: 490,
    priceId: process.env.STRIPE_PRICE_STARTER || "price_starter",
    currency: "usd",
  },
  premium: {
    name: "Premium Pack",
    price: 990,
    priceId: process.env.STRIPE_PRICE_PREMIUM || "price_premium",
    currency: "usd",
  },
  vip: {
    name: "VIP Prestige",
    price: 1990,
    priceId: process.env.STRIPE_PRICE_VIP || "price_vip",
    currency: "usd",
  },
} as const;

export type PackageKey = keyof typeof PACKAGES;
