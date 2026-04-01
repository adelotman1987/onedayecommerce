"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });

    // 🔥 bounce animation
    if (buttonsRef.current) {
      gsap.fromTo(
          buttonsRef.current,
          { scale: 1 },
          { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 }
      );
    }
  };

  const onBuyNow = () => {
    onAddItem();
    router.push("/checkout");
  };

  // ✨ entrance animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
        imageRef.current,
        { x: -60, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }
    ).fromTo(
        contentRef.current?.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
    );
  }, []);

  return (
      <div ref={containerRef} className="container mx-auto px-4 py-10">
        <div
            className="
        flex flex-col md:flex-row gap-10 items-center
        rounded-2xl
        backdrop-blur-xl
        bg-white/20
        border border-white/20
        shadow-[0_10px_40px_rgba(0,0,0,0.2)]
        p-6
        relative
        overflow-hidden
      "
        >
          {/* ✨ glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-400/20 blur-3xl" />
          </div>

          {/* 🖼 IMAGE */}
          {product.images && product.images[0] && (
              <div
                  ref={imageRef}
                  className="relative h-96 w-full md:w-1/2 rounded-xl overflow-hidden"
              >
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
          )}

          {/* 📦 CONTENT */}
          <div ref={contentRef} className="md:w-1/2 relative space-y-4">
            <h1 className="text-3xl font-bold text-black/90">
              {product.name}
            </h1>

            {product.description && (
                <p className="text-black/70">{product.description}</p>
            )}

            {price && price.unit_amount && (
                <p className="text-2xl font-semibold text-black">
                  ${(price.unit_amount / 100).toFixed(2)}
                </p>
            )}

            {/* QUANTITY */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => removeItem(product.id)}>
                –
              </Button>

              <span className="text-lg font-semibold">{quantity}</span>

              <Button onClick={onAddItem}>+</Button>
            </div>

            {/* ACTIONS */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="flex-1 bg-black/80 text-white hover:bg-black transition">
                Add to Cart
              </Button>

              <Button
                  onClick={onBuyNow}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
};