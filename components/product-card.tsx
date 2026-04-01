"use client";

import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
      <Link href={`/products/${product.id}`} className="block h-full">
        <Card
            className="
          group
          relative
          h-full
          flex flex-col
          rounded-2xl
          backdrop-blur-xl
          bg-white/20
          border border-white/20
          shadow-[0_10px_40px_rgba(0,0,0,0.2)]
          overflow-hidden
          transition-all duration-300
          hover:scale-[1.03]
        "
        >
          {/* ✨ GLOW */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300">
            <div
                className="
              absolute -top-20 left-1/2 -translate-x-1/2
              w-[250px] h-[250px]
              bg-blue-400/20
              blur-3xl
            "
            />
          </div>

          {/* 🖼 IMAGE */}
          {product.images && product.images[0] && (
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="
                object-cover
                transition duration-500
                group-hover:scale-110
                group-hover:brightness-90
              "
                />
              </div>
          )}

          {/* 📝 CONTENT */}
          <CardHeader className="p-4 relative">
            <CardTitle className="text-xl font-bold text-black/80 group-hover:text-blue-600 transition">
              {product.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 flex-grow flex flex-col justify-between relative">
            {product.description && (
                <p className="text-black/60 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
            )}

            {price && price.unit_amount && (
                <p className="text-lg font-semibold text-black/90">
                  ${(price.unit_amount / 100).toFixed(2)}
                </p>
            )}

            <Button
                className="
              mt-4
              bg-black/80
              text-white
              backdrop-blur-md
              hover:bg-blue-600
              transition
            "
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </Link>
  );
};