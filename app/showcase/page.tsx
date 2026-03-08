'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/products';
import { Product } from '@/lib/types';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function ShowcasePage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const addItem = useCartStore((state) => state.addItem);

    const selectedProduct = products.find((p) => p.id === selectedId);

    return (
        <div className="pt-24 min-h-screen bg-background px-6">
            <div className="container mx-auto max-w-7xl pb-24">

                <div className="text-center mb-16 max-w-2xl mx-auto pt-10">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-widest uppercase mb-6">
                        The Showcase
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        A curated gallery of our finest pieces. Click on any item to explore its craftsmanship and specifications in detail.
                    </p>
                </div>

                {/* Masonry Grid Simulation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.id}
                            layoutId={`card-container-${product.id}`}
                            onClick={() => setSelectedId(product.id)}
                            className={`relative cursor-pointer overflow-hidden rounded-lg group bg-secondary ${i === 0 || i === 3 || i === 7 ? 'md:col-span-2 lg:col-span-2' : ''
                                } ${i === 2 || i === 6 ? 'row-span-2' : ''}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-medium tracking-widest uppercase bg-black/50 px-6 py-3 backdrop-blur-sm">
                                    View Details
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Details Modal */}
                <Dialog open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
                    <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none">
                        <VisuallyHidden><DialogTitle>Product Details</DialogTitle></VisuallyHidden>
                        <AnimatePresence>
                            {selectedProduct && (
                                <motion.div
                                    layoutId={`card-container-${selectedProduct.id}`}
                                    className="bg-background w-full h-full flex flex-col md:flex-row overflow-hidden rounded-xl shadow-2xl relative"
                                >
                                    {/* Left: Image */}
                                    <div className="w-full md:w-1/2 relative min-h-[400px]">
                                        <Image
                                            src={selectedProduct.image}
                                            alt={selectedProduct.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Right: Info */}
                                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto max-h-[80vh]">
                                        <div className="mb-2 text-sm text-muted-foreground uppercase tracking-widest">
                                            {selectedProduct.category}
                                        </div>
                                        <h2 className="text-3xl font-semibold mb-2">{selectedProduct.name}</h2>
                                        <div className="text-xl font-medium mb-6">{formatPrice(selectedProduct.price)}</div>

                                        <p className="text-muted-foreground leading-relaxed mb-8">
                                            {selectedProduct.description}
                                        </p>

                                        <div className="space-y-6 mb-10 flex-1">
                                            <div>
                                                <h4 className="font-semibold uppercase tracking-wider text-sm mb-3 border-b pb-2">Dimensions</h4>
                                                <ul className="grid grid-cols-3 gap-4 text-sm">
                                                    <li><span className="text-muted-foreground">Width:</span> {selectedProduct.dimensions.width}</li>
                                                    <li><span className="text-muted-foreground">Depth:</span> {selectedProduct.dimensions.depth}</li>
                                                    <li><span className="text-muted-foreground">Height:</span> {selectedProduct.dimensions.height}</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold uppercase tracking-wider text-sm mb-3 border-b pb-2">Materials</h4>
                                                <ul className="text-sm space-y-2">
                                                    {selectedProduct.materials.map((m) => (
                                                        <li key={m} className="flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                                                            {m}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => {
                                                addItem(selectedProduct, 1);
                                                setSelectedId(null);
                                            }}
                                            className="w-full uppercase tracking-widest rounded-none h-14 text-md"
                                        >
                                            <Plus className="mr-2 h-5 w-5" /> Add to Cart
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
