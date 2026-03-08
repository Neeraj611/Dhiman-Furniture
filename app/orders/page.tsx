'use client';

import { useOrderStore } from '@/store/orderStore';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import { useRouter } from 'next/navigation';

export default function OrdersPage() {
    const { orders } = useOrderStore();
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="pt-32 pb-24 min-h-[60vh] flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-3xl font-semibold mb-6 tracking-widest uppercase">Your Orders</h1>
                <p className="text-muted-foreground mb-8">You haven't placed any orders yet.</p>
                <Button onClick={() => router.push('/shop')} className="rounded-none px-8 tracking-widest uppercase">
                    Start Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-6 max-w-5xl">
                <h1 className="text-3xl font-semibold mb-10 tracking-widest uppercase">Your Orders</h1>

                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order.id} className="border bg-card">
                            <div className="p-6 border-b bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
                                    <div>
                                        <p className="text-muted-foreground uppercase tracking-widest mb-1 text-xs">Order Placed</p>
                                        <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground uppercase tracking-widest mb-1 text-xs">Total</p>
                                        <p className="font-medium">{formatPrice(order.total)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground uppercase tracking-widest mb-1 text-xs">Order ID</p>
                                        <p className="font-medium font-mono">{order.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-foreground text-background">
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <ul className="divide-y">
                                    {order.items.map((item, idx) => (
                                        <li key={idx} className="py-6 first:pt-0 last:pb-0 flex gap-6">
                                            <div className="relative w-24 h-24 bg-background border flex-shrink-0">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h4 className="font-medium uppercase tracking-widest text-sm mb-1">{item.product.name}</h4>
                                                <p className="text-muted-foreground text-sm mb-2">Qty: {item.quantity}</p>
                                                <p className="font-semibold">{formatPrice(item.product.price)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
