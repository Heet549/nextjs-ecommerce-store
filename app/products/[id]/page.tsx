import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById, products } from "@/lib/products";
import { ProductDetail } from "@/components/products/product-detail";

interface Props {
  params: Promise<{ id: string }>;
}

// Generate static params for all products (SSG)
export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
