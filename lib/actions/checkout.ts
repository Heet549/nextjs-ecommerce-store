"use server";

import { checkoutSchema } from "@/lib/schemas/checkout";
import { generateOrderId } from "@/lib/utils";
import type { OrderResult } from "@/types";

function sanitize(value: string): string {
  return value.trim().replace(/[<>]/g, "");
}

export async function submitCheckout(
  _prevState: OrderResult | null,
  formData: FormData
): Promise<OrderResult> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Extract and sanitize raw form data
  const rawData = {
    firstName: sanitize(formData.get("firstName") as string ?? ""),
    lastName: sanitize(formData.get("lastName") as string ?? ""),
    email: sanitize(formData.get("email") as string ?? ""),
    phone: sanitize(formData.get("phone") as string ?? ""),
    address: sanitize(formData.get("address") as string ?? ""),
    city: sanitize(formData.get("city") as string ?? ""),
    state: sanitize(formData.get("state") as string ?? ""),
    postalCode: sanitize(formData.get("postalCode") as string ?? ""),
    country: sanitize(formData.get("country") as string ?? ""),
    cardName: sanitize(formData.get("cardName") as string ?? ""),
    cardNumber: sanitize(formData.get("cardNumber") as string ?? ""),
    cardExpiry: sanitize(formData.get("cardExpiry") as string ?? ""),
    cardCvv: sanitize(formData.get("cardCvv") as string ?? ""),
  };

  // Server-side validation (independent of client validation)
  const parsed = checkoutSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    });
    return {
      success: false,
      message: "Validation failed. Please check your details.",
      errors: fieldErrors,
    };
  }

  // In a real app: charge card, create order in DB, send confirmation email
  const orderId = generateOrderId();

  return {
    success: true,
    orderId,
    message: `Order ${orderId} placed successfully! Confirmation sent to ${parsed.data.email}.`,
  };
}
