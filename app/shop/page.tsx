'use client';

import { useState } from 'react';
import { getProductsByCategory, products } from '@/lib/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Living Room', 'Bedroom', 'Office'];

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const displayedProducts = getProductsByCategory(activeCategory);

    return (
        <div className="pt-24 min-h-screen bg-background">
            {/* Header */}
            <div className="bg-secondary/30 border-b">
                <div className="container mx-auto px-6 max-w-7xl py-16 flex flex-col items-center text-center">
                    <h1 className="text-4xl font-semibold tracking-widest uppercase mb-4">The Shop</h1>
                    <p className="text-muted-foreground max-w-xl">
                        Browse our complete collection of meticulously crafted furniture. Perfect proportions meets uncompromising quality.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl py-12">
                {/* Category Filter */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                    {CATEGORIES.map((cat) => (
                        <Button
                            key={cat}
                            variant={activeCategory === cat ? 'default' : 'outline'}
                            className={`rounded-full px-8 tracking-widest uppercase text-xs h-10 transition-all ${activeCategory === cat
                                    ? 'bg-foreground text-background hover:bg-foreground/90'
                                    : 'hover:border-foreground'
                                }`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
                >
                    {displayedProducts.map((product) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={product.id}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>

                {displayedProducts.length === 0 && (
                    <div className="text-center py-24 text-muted-foreground">
                        No products found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}
