"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useCartStore, useCartItems, useCartTotalPrice } from "@/lib/store/cart";
import { CartItem } from "@/components/cart/cart-item";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartItems();
  const totalPrice = useCartTotalPrice();
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setMounted(true);
  }, []);

  const shipping = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48" />
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Shopping Cart</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {items.length === 0 ? "Your cart is empty" : `${items.reduce((s, i) => s + i.quantity, 0)} items`}
          </p>
        </div>
        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            id="clear-cart-btn"
          >
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Looks like you haven't added any products yet.
          </p>
          <Link href="/">
            <Button id="continue-shopping-btn">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 divide-y divide-gray-100 dark:divide-gray-800">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0
                      ? <span className="text-emerald-600 font-medium">FREE</span>
                      : formatPrice(shipping)
                    }
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Estimated Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-3 mb-6">
                <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 text-lg">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice + shipping + tax)}</span>
                </div>
              </div>

              {totalPrice <= 50 && (
                <p className="text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950 rounded-lg px-3 py-2 mb-4">
                  Add {formatPrice(50 - totalPrice)} more for free shipping!
                </p>
              )}

              <Link href="/checkout">
                <Button className="w-full h-12 font-bold text-base" id="checkout-btn">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/" className="block mt-3">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
