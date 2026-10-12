"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ShoppingCart, ArrowLeft, Check, Minus, Plus } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = async () => {
    setAdding(true);
    for (let i = 0; i < qty; i++) addItem(product);
    toast({
      variant: "success",
      title: "Added to cart!",
      description: `${qty} × ${product.name}`,
    });
    await new Promise((r) => setTimeout(r, 600));
    setAdding(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-950 dark:to-indigo-950">
              <span className="text-8xl font-bold text-violet-300">
                {product.name.charAt(0)}
              </span>
            </div>
          )}
          {discountPercent && (
            <div className="absolute top-4 left-4">
              <Badge variant="sale" className="text-sm px-3 py-1">
                -{discountPercent}% OFF
              </Badge>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-2">
            {product.category}
          </p>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center" aria-label={`Rating: ${product.rating} out of 5`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{product.rating}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 dark:text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Features */}
          {product.features.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Key Features</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                product.stock === 0
                  ? "bg-red-500"
                  : product.stock <= 10
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.stock === 0
                ? "Out of stock"
                : product.stock <= 10
                ? `Only ${product.stock} left in stock`
                : "In stock"}
            </span>
          </div>

          {/* Quantity + Add */}
          <div className="flex items-center gap-3 mt-auto">
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Decrease quantity"
                disabled={qty <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 text-sm font-semibold min-w-[3rem] text-center border-x border-gray-300 dark:border-gray-700">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(q + 1, product.stock))}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Increase quantity"
                disabled={qty >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              id={`add-to-cart-detail-${product.id}`}
              onClick={handleAddToCart}
              disabled={adding || product.stock === 0}
              size="lg"
              className="flex-1 font-bold"
            >
              <ShoppingCart className="h-5 w-5" />
              {adding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
