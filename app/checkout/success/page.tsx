import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your order has been placed successfully at NovaShop.",
};

interface Props {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md w-full">
        {/* Success Icon */}
        <div className="relative inline-flex mb-8">
          <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
            <CheckCircle className="h-14 w-14 text-emerald-500" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
            <Package className="h-4 w-4 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
          Order Confirmed!
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-2">
          Thank you for your purchase. We're preparing your order now.
        </p>

        {orderId && (
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-6 py-4 my-6 inline-block w-full">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
            <p className="text-lg font-bold text-violet-600 dark:text-violet-400 font-mono">
              {orderId}
            </p>
          </div>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          You'll receive a confirmation email shortly. Estimated delivery: 3–5 business days.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="outline" id="back-to-home-btn">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/products">
            <Button id="continue-shopping-success-btn">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
