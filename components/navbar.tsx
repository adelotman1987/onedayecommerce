"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <nav className="sticky top-4 z-50 px-4">

        {/* 🔥 GLASS CONTAINER */}
        <div className="
        max-w-6xl mx-auto
        rounded-2xl
        backdrop-blur-xl
        bg-white/20
        border border-white/30
        shadow-[0_8px_32px_rgba(0,0,0,0.2)]
        relative
        overflow-hidden
      ">

          {/* ✨ GLOW EFFECT */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="
            absolute -top-20 left-1/2 -translate-x-1/2
            w-[300px] h-[300px]
            bg-blue-400/20
            blur-3xl
            opacity-70
          " />
          </div>

          {/* CONTENT */}
          <div className="flex items-center justify-between px-6 py-4">

            {/* LOGO */}
            <Link href="/" className="font-semibold text-black/80 hover:text-blue-600 transition">
              My Ecommerce
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex space-x-8 text-black/80">
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
              <Link href="/products" className="hover:text-blue-600 transition">
                Products
              </Link>
              <Link href="/checkout" className="hover:text-blue-600 transition">
                Checkout
              </Link>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-4">

              {/* CART */}
              <Link href="/checkout" className="relative">
                <ShoppingCartIcon className="h-6 w-6 text-black/80" />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
                )}
              </Link>

              {/* MOBILE BUTTON */}
              <Button
                  variant="ghost"
                  className="md:hidden text-black/80"
                  onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                ) : (
                    <Bars3Icon className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* 📱 MOBILE MENU (גם עם glass + glow) */}
        {mobileOpen && (
            <div className="mt-2 px-2">
              <div className="
            rounded-xl
            backdrop-blur-xl
            bg-white/30
            border border-white/20
            shadow-[0_8px_30px_rgba(0,0,0,0.2)]
            overflow-hidden
            relative
          ">

                {/* glow */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="
                absolute top-0 left-1/2 -translate-x-1/2
                w-[200px] h-[200px]
                bg-blue-400/20
                blur-3xl
              " />
                </div>

                <ul className="flex flex-col p-4 space-y-3 text-black/80 relative">
                  <li>
                    <Link href="/" className="block hover:text-blue-600 transition">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="block hover:text-blue-600 transition">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/checkout" className="block hover:text-blue-600 transition">
                      Checkout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
        )}
      </nav>
  );
};