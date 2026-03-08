'use client';

import { Product } from '@/lib/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem(product, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="group relative flex flex-col bg-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-secondary w-full overflow-hidden">
                {product.featured && (
                    <Badge className="absolute top-4 left-4 z-10 bg-foreground text-background">
                        Featured
                    </Badge>
                )}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Quick Add overlay */}
                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-background/90 backdrop-blur-sm text-foreground py-3 text-sm font-semibold tracking-widest uppercase shadow-sm flex items-center justify-center gap-2 hover:bg-foreground hover:text-background transition-colors rounded-none"
                    >
                        {isAdded ? 'Added' : <><Plus className="h-4 w-4" /> Add to Cart</>}
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <Link href={`/showcase?product=${product.slug}`} className="p-5 flex flex-col flex-1 gap-2 cursor-pointer">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold tracking-wide text-lg line-clamp-1">{product.name}</h3>
                    <span className="font-medium shrink-0">{formatPrice(product.price)}</span>
                </div>
                <p className="text-muted-foreground text-sm">{product.category}</p>
            </Link>
        </div>
    );
}
