"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { gsap } from "gsap";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // 👉 refs for ALL links
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const animate = (i: number, scale: number) => {
    gsap.to(linkRefs.current[i], {
      scale,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleClick = (i: number) => {
    gsap.fromTo(
        linkRefs.current[i],
        { scale: 0.9 },
        { scale: 1, duration: 0.3, ease: "bounce.out" }
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 👉 links config (better scalable)
  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Checkout", href: "/checkout" },
  ];

  return (
      <nav className="sticky  top-0 z-50 bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">

          {/* Logo */}
          <Link href="/" className="hover:text-blue-600  font-bold text-lg">
            One Day Shop
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.href}
                    ref={(el) => (linkRefs.current[i] = el)}
                    onMouseEnter={() => animate(i, 1.1)}
                    onMouseLeave={() => animate(i, 1)}
                    onClick={() => handleClick(i)}
                    className="transition-colors hover:text-blue-600"
                >
                  {link.name}
                </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Link href="/checkout" className="relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
              )}
            </Link>

            <Button
                variant="ghost"
                className="md:hidden"
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

        {/* Mobile Menu */}
        {mobileOpen && (
            <nav className="md:hidden bg-white shadow-md">
              <ul className="flex flex-col p-4 space-y-2">
                {links.map((link, i) => (
                    <li key={i}>
                      <Link
                          href={link.href}
                          ref={(el) => (linkRefs.current[i + 10] = el)} // offset index
                          onMouseEnter={() => animate(i + 10, 1.05)}
                          onMouseLeave={() => animate(i + 10, 1)}
                          onClick={() => {
                            handleClick(i + 10);
                            setMobileOpen(false);
                          }}
                          className="block hover:text-blue-600"
                      >
                        {link.name}
                      </Link>
                    </li>
                ))}
              </ul>
            </nav>
        )}
      </nav>
  );
};