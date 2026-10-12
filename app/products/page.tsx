import type { Metadata } from "next";
import { products } from "@/lib/products";
import { CategoryFilter } from "@/components/products/category-filter";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse all 20+ premium products at NovaShop — Electronics, Clothing, Home & Garden, Sports.",
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-1">
          Shop
        </p>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">All Products</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {products.length} products across 4 categories
        </p>
      </div>
      <CategoryFilter allProducts={products} />
    </div>
  );
}
