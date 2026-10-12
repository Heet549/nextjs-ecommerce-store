"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2, CreditCard, MapPin, User, Lock } from "lucide-react";
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas/checkout";
import { submitCheckout } from "@/lib/actions/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/store/cart";
import type { OrderResult } from "@/types";
import { useEffect } from "react";

const initialState: OrderResult | null = null;

function FormField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);
  const [serverResult, formAction, isPending] = useActionState(submitCheckout, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
  });

  // Handle successful order
  useEffect(() => {
    if (serverResult?.success && serverResult.orderId) {
      clearCart();
      router.push(`/checkout/success?orderId=${serverResult.orderId}`);
    }
  }, [serverResult, clearCart, router]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    formAction(formData);
  });

  const sectionClass = "bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4";
  const sectionHeaderClass = "flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-100 mb-4";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate aria-label="Checkout form">
      {/* Server-side error */}
      {serverResult && !serverResult.success && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <p className="text-sm font-medium text-red-700 dark:text-red-400">{serverResult.message}</p>
        </div>
      )}

      {/* Personal Info */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <User className="h-4 w-4 text-violet-600" />
          Contact Information
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="First Name" id="firstName" error={errors.firstName?.message}>
            <Input
              id="firstName"
              placeholder="John"
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
          </FormField>
          <FormField label="Last Name" id="lastName" error={errors.lastName?.message}>
            <Input
              id="lastName"
              placeholder="Doe"
              autoComplete="family-name"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </FormField>
          <FormField label="Email" id="email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
          </FormField>
          <FormField label="Phone" id="phone" error={errors.phone?.message}>
            <Input
              id="phone"
              type="tel"
              placeholder="555-123-4567"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone")}
            />
          </FormField>
        </div>
      </div>

      {/* Shipping Address */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <MapPin className="h-4 w-4 text-violet-600" />
          Shipping Address
        </div>
        <FormField label="Street Address" id="address" error={errors.address?.message}>
          <Input
            id="address"
            placeholder="123 Main Street"
            autoComplete="street-address"
            error={errors.address?.message}
            {...register("address")}
          />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="City" id="city" error={errors.city?.message}>
            <Input
              id="city"
              placeholder="New York"
              autoComplete="address-level2"
              error={errors.city?.message}
              {...register("city")}
            />
          </FormField>
          <FormField label="State / Province" id="state" error={errors.state?.message}>
            <Input
              id="state"
              placeholder="NY"
              autoComplete="address-level1"
              error={errors.state?.message}
              {...register("state")}
            />
          </FormField>
          <FormField label="Postal Code" id="postalCode" error={errors.postalCode?.message}>
            <Input
              id="postalCode"
              placeholder="10001"
              autoComplete="postal-code"
              error={errors.postalCode?.message}
              {...register("postalCode")}
            />
          </FormField>
          <FormField label="Country" id="country" error={errors.country?.message}>
            <Input
              id="country"
              placeholder="United States"
              autoComplete="country-name"
              error={errors.country?.message}
              {...register("country")}
            />
          </FormField>
        </div>
      </div>

      {/* Payment */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <CreditCard className="h-4 w-4 text-violet-600" />
          Payment Details
        </div>
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-2.5 mb-4 flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            This is a demo. Do not enter real card details.
          </p>
        </div>

        <FormField label="Cardholder Name" id="cardName" error={errors.cardName?.message}>
          <Input
            id="cardName"
            placeholder="John Doe"
            autoComplete="cc-name"
            error={errors.cardName?.message}
            {...register("cardName")}
          />
        </FormField>
        <FormField label="Card Number" id="cardNumber" error={errors.cardNumber?.message}>
          <Input
            id="cardNumber"
            placeholder="4242 4242 4242 4242"
            autoComplete="cc-number"
            maxLength={19}
            error={errors.cardNumber?.message}
            {...register("cardNumber")}
          />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Expiry (MM/YY)" id="cardExpiry" error={errors.cardExpiry?.message}>
            <Input
              id="cardExpiry"
              placeholder="12/27"
              autoComplete="cc-exp"
              maxLength={5}
              error={errors.cardExpiry?.message}
              {...register("cardExpiry")}
            />
          </FormField>
          <FormField label="CVV" id="cardCvv" error={errors.cardCvv?.message}>
            <Input
              id="cardCvv"
              type="password"
              placeholder="•••"
              autoComplete="cc-csc"
              maxLength={4}
              error={errors.cardCvv?.message}
              {...register("cardCvv")}
            />
          </FormField>
        </div>
      </div>

      <Button
        type="submit"
        id="place-order-btn"
        disabled={isPending || isSubmitting}
        className="w-full h-14 text-base font-bold"
        size="lg"
      >
        {(isPending || isSubmitting) ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing Order...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Place Order Securely
          </>
        )}
      </Button>
    </form>
  );
}
