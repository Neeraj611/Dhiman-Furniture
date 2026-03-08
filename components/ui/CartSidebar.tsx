'use client';

import { useCartStore } from '@/store/cartStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface CartSidebarProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartSidebar({ isOpen, onOpenChange }: CartSidebarProps) {
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="font-outfit uppercase tracking-widest text-lg">
                        Your Cart ({items.length})
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 p-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 mt-20">
                            <p className="text-muted-foreground">Your cart is empty.</p>
                            <Button onClick={() => onOpenChange(false)} variant="outline">
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.product.id} className="flex gap-4 border-b pb-6">
                                    <div className="relative w-24 h-24 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.product.image}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold">{item.product.name}</h3>
                                            <p className="text-sm text-muted-foreground">{item.product.category}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="p-2 hover:bg-secondary disabled:opacity-50"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-secondary"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <span className="font-medium">
                                                    {formatPrice(item.product.price * item.quantity)}
                                                </span>
                                                <button
                                                    onClick={() => removeItem(item.product.id)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {items.length > 0 && (
                    <div className="border-t p-6 bg-background">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-medium tracking-wide">Subtotal</span>
                            <span className="text-xl font-semibold">{formatPrice(getCartTotal())}</span>
                        </div>
                        <Link href="/checkout">
                            <Button className="w-full text-md h-12 tracking-wider uppercase rounded-none" onClick={() => onOpenChange(false)}>
                                Proceed to Checkout
                            </Button>
                        </Link>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
