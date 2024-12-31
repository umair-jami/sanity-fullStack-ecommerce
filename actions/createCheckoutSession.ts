"use server";

import { BasketItem } from "@/store/store";
import stripe from "@/lib/stripe";
import { imageUrl } from "@/lib/imageUrl";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // Validate items
    const itemsWithOutPrice = items.filter((item) => !item.product.price);
    if (itemsWithOutPrice.length > 0) {
      throw new Error("Product price is not set");
    }

    // Get or create customer
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Ensure proper URL construction
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://localhost:3000");

    // Create success and cancel URLs
    const successUrl =
      new URL("/success", baseUrl).toString() +
      `?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

    const cancelUrl = new URL("/basket", baseUrl).toString();

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((item) => ({
        price_data: {
          currency: "gbp",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id, // This must match your Sanity product ID
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
