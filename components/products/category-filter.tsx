"use client";

import { useState } from "react";
import { categories } from "@/lib/products";
import type { Product } from "@/types";
import { ProductGrid } from "./product-grid";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  allProducts: Product[];
}

export function CategoryFilter({ allProducts }: CategoryFilterProps) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === active);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Product categories">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            id={`tab-${cat.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={() => setActive(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
              active === cat
                ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/30"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400"
            )}
          >
            {cat}
            <span className="ml-1.5 text-xs opacity-60">
              ({cat === "All" ? allProducts.length : allProducts.filter((p) => p.category === cat).length})
            </span>
          </button>
        ))}
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
