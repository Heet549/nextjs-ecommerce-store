import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-extrabold text-violet-200 dark:text-violet-900 select-none mb-4">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button id="not-found-home">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" id="not-found-products">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
