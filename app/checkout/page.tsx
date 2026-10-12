import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase securely at NovaShop.",
};

export default function CheckoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-2">
          <Lock className="h-4 w-4" />
          Secure Checkout
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Complete Your Order
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-3">
          <Suspense
            fallback={
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
                ))}
              </div>
            }
          >
            <CheckoutForm />
          </Suspense>
        </div>

        {/* Order Summary sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
            <Suspense
              fallback={
                <div className="animate-pulse space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-40" />
                  <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
              }
            >
              <OrderSummary />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
