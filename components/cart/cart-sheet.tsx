"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, X, ArrowRight } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useCartStore, useCartItems, useCartTotalPrice } from "@/lib/store/cart";
import { CartItem } from "./cart-item";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function CartSheet() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartItems();
  const totalPrice = useCartTotalPrice();

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setMounted(true);
  }, []);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          id="cart-trigger"
          className="relative inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          aria-label="Open shopping cart"
        >
          <ShoppingBag className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          {mounted && items.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
              {items.reduce((s, i) => s + i.quantity, 0) > 99 ? "99+" : items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-md bg-white dark:bg-gray-950 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-violet-600" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Shopping Cart
              </h2>
              {mounted && items.length > 0 && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({items.reduce((s, i) => s + i.quantity, 0)} items)
                </span>
              )}
            </div>
            <DialogPrimitive.Close asChild>
              <button className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Close cart">
                <X className="h-4 w-4" />
              </button>
            </DialogPrimitive.Close>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-2">
            {!mounted || items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <ShoppingBag className="h-10 w-10 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">Your cart is empty</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add items to get started</p>
                </div>
                <DialogPrimitive.Close asChild>
                  <Link href="/">
                    <Button variant="outline" size="sm">Continue Shopping</Button>
                  </Link>
                </DialogPrimitive.Close>
              </div>
            ) : (
              <div>
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {mounted && items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Shipping and taxes calculated at checkout
              </p>
              <DialogPrimitive.Close asChild>
                <Link href="/checkout" className="block">
                  <Button className="w-full h-12 text-base font-semibold" id="proceed-to-checkout">
                    Checkout
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </DialogPrimitive.Close>
              <DialogPrimitive.Close asChild>
                <Link href="/cart" className="block">
                  <Button variant="outline" className="w-full" id="view-cart">
                    View Cart
                  </Button>
                </Link>
              </DialogPrimitive.Close>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
