import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import { products } from "@/lib/products";
import { CategoryFilter } from "@/components/products/category-filter";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "NovaShop — Premium Online Store",
  description:
    "Explore 20+ premium products across Electronics, Clothing, Home & Garden, and Sports. Free shipping on orders over $50.",
};

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
  { icon: Shield, title: "Secure Payments", desc: "256-bit SSL encryption" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6 border border-white/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now with 20+ Premium Products
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Shop the Future,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
              Delivered Today
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Curated premium electronics, fashion, home goods, and sports gear.
            Free shipping on orders over $50.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products" className="inline-flex">
              <Button
                size="lg"
                id="hero-shop-now"
                className="bg-white text-violet-700 hover:bg-gray-50 shadow-xl hover:shadow-2xl border-0 font-bold text-base px-8"
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-bold text-base px-8"
                id="hero-view-all"
              >
                View All Products
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
            {[
              { value: "20+", label: "Products" },
              { value: "4.7★", label: "Avg Rating" },
              { value: "Free", label: "Returns" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold">{stat.value}</div>
                <div className="text-sm text-white/70 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features bar */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-200 dark:divide-gray-800">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 py-5 px-6">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-1">
              Our Collection
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Featured Products
            </h2>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category filter is a Client Component; passes server data down */}
        <CategoryFilter allProducts={products} />
      </section>
    </div>
  );
}
