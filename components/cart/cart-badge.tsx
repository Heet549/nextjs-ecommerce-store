"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartTotalItems } from "@/lib/store/cart";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";

export function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartTotalItems();

  // Hydration guard — Zustand persist with skipHydration
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setMounted(true);
  }, []);

  return (
    <div className="relative inline-flex">
      <ShoppingCart className="h-5 w-5" />
      {mounted && totalItems > 0 && (
        <span
          className={cn(
            "absolute -top-2 -right-2 h-4 w-4 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center",
            "animate-in zoom-in-50 duration-200"
          )}
          aria-label={`${totalItems} items in cart`}
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </div>
  );
}
