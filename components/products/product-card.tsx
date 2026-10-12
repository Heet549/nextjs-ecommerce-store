"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const badgeVariantMap: Record<string, "sale" | "new" | "popular" | "default"> = {
  "Sale": "sale",
  "New": "new",
  "Popular": "popular",
  "Best Seller": "default",
  "Top Rated": "default",
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [adding, setAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    addItem(product);
    toast({
      variant: "success",
      title: "Added to cart!",
      description: product.name,
    });
    await new Promise((r) => setTimeout(r, 600));
    setAdding(false);
  };

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <article className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-violet-500/10 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-950 dark:to-indigo-950">
            <span className="text-4xl font-bold text-violet-400">
              {product.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <Badge variant={badgeVariantMap[product.badge] ?? "default"}>
              {product.badge}
            </Badge>
          )}
          {discountPercent && (
            <Badge variant="sale">-{discountPercent}%</Badge>
          )}
        </div>

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-900 shadow-lg hover:bg-violet-50 dark:hover:bg-violet-950 transition-colors"
            aria-label={`View ${product.name} details`}
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Link>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category */}
        <p className="text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-violet-600 dark:hover:text-violet-400 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center" aria-label={`Rating: ${product.rating} out of 5`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3.5 w-3.5 ${
                  star <= Math.round(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-gray-900 dark:text-gray-100">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock */}
        {product.stock <= 10 && (
          <p className="text-xs text-red-500 mt-1">Only {product.stock} left!</p>
        )}

        {/* Add to cart */}
        <div className="mt-3">
          <Button
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            size="sm"
            className="w-full"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {adding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </article>
  );
}
