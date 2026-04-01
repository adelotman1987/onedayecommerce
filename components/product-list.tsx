"use client";

import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
    products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredProduct = products.filter((product) => {
        const term = searchTerm.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(term);
        const descriptionMatch = product.description
            ? product.description.toLowerCase().includes(term)
            : false;

        return nameMatch || descriptionMatch;
    });

    return (
        <div className="px-4">

            {/* 🔍 GLASS SEARCH */}
            <div className="mb-8 flex justify-center">
                <div className="
          relative
          w-full max-w-md
          rounded-2xl
          backdrop-blur-xl
          bg-white/20
          border border-white/30
          shadow-[0_8px_30px_rgba(0,0,0,0.2)]
          overflow-hidden
        ">

                    {/* ✨ glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="
              absolute -top-10 left-1/2 -translate-x-1/2
              w-[200px] h-[200px]
              bg-blue-400/20
              blur-3xl
            " />
                    </div>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="
              w-full
              bg-transparent
              px-4 py-3
              text-black/80
              placeholder:text-black/50
              focus:outline-none
            "
                    />
                </div>
            </div>

            {/* 🛍️ PRODUCTS GRID */}
            <ul className="
        mt-6
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
      ">
                {filteredProduct.map((product, key) => (
                    <li
                        key={key}
                        className="
              group
              relative
              rounded-2xl
              backdrop-blur-xl
              bg-white/20
              border border-white/20
              shadow-[0_8px_30px_rgba(0,0,0,0.15)]
              overflow-hidden
              transition
              hover:scale-[1.02]
            "
                    >

                        {/* ✨ glow hover */}
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition">
                            <div className="
                absolute -top-20 left-1/2 -translate-x-1/2
                w-[250px] h-[250px]
                bg-blue-400/20
                blur-3xl
              " />
                        </div>

                        <div className="relative">
                            <ProductCard product={product} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};