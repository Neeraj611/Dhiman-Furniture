'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useOrderStore } from '@/store/orderStore';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const { items, getCartTotal, clearCart } = useCartStore();
    const { addOrder } = useOrderStore();
    const router = useRouter();

    if (items.length === 0 && currentStep === 0) {
        return (
            <div className="pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-3xl font-semibold mb-6 tracking-widest uppercase">Checkout</h1>
                <p className="text-muted-foreground mb-8">Your cart is empty. Add a piece to proceed.</p>
                <Button onClick={() => router.push('/shop')} className="rounded-none px-8 tracking-widest uppercase">
                    Back to Shop
                </Button>
            </div>
        );
    }

    const handleNext = async () => {
        // Simulate payment processing on Step 1 -> Step 2
        if (currentStep === 1) {
            setIsProcessing(true);
            await new Promise((resolve) => setTimeout(resolve, 2500)); // 2.5s simulated delay
            setIsProcessing(false);
            setCurrentStep(curr => curr + 1);
        } else if (currentStep < 2) {
            setCurrentStep(curr => curr + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        // Generate mock order ID using timestamp
        const orderId = `AURA-${Date.now().toString().slice(-6)}`;

        // Save order to store
        addOrder({
            id: orderId,
            date: new Date().toISOString(),
            items: [...items],
            total: getCartTotal(),
            status: 'Processing',
        });

        // In a real app we'd save the order in a DB here.
        // For now, we clear cart and pass total to success via query params (mock approach)
        clearCart();
        router.push(`/checkout/success?orderId=${orderId}`);
    };

    const handleBack = () => {
        if (currentStep > 0 && !isProcessing) setCurrentStep(curr => curr - 1);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Main Flow Form */}
                <div className="lg:col-span-7 relative">

                    {/* Processing Overlay */}
                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center text-center border p-8"
                        >
                            <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary" />
                            <h3 className="text-xl font-semibold uppercase tracking-widest mb-2">Securing Transaction</h3>
                            <p className="text-muted-foreground text-sm">Please do not close this window or click back.</p>
                        </motion.div>
                    )}

                    <h1 className="text-3xl font-semibold mb-2 tracking-widest uppercase">Secure Checkout</h1>
                    <p className="text-muted-foreground mb-10">Step {currentStep + 1} of 3: {STEPS[currentStep]}</p>

                    {/* Stepper Indicator */}
                    <div className="flex items-center gap-4 mb-12">
                        {STEPS.map((stepLabel, idx) => (
                            <div key={stepLabel} className="flex flex-1 items-center gap-2 overflow-hidden">
                                <div
                                    className={`h-8 w-8 flex items-center justify-center rounded-full text-sm shrink-0 border transition-colors ${idx <= currentStep ? 'bg-foreground text-background border-foreground' : 'bg-transparent text-muted-foreground border-border'
                                        }`}
                                >
                                    {idx + 1}
                                </div>
                                <div
                                    className={`h-[1px] flex-1 ${idx < currentStep ? 'bg-foreground' : 'bg-border'
                                        }`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Form Step 1: Shipping */}
                    {currentStep === 0 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="Jane" className="h-12 rounded-none" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" className="h-12 rounded-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="jane@example.com" className="h-12 rounded-none" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Luxury Lane" className="h-12 rounded-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="New York" className="h-12 rounded-none" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                                    <Input id="zip" placeholder="10001" className="h-12 rounded-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Step 2: Payment */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="p-6 border bg-secondary/20 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-lg uppercase tracking-widest">Card Details</h3>
                                    <div className="flex gap-2">
                                        <div className="w-10 h-6 bg-zinc-200 rounded relative overflow-hidden"><div className="absolute top-1/2 left-2 w-3 h-3 bg-red-500/80 rounded-full -translate-y-1/2"></div><div className="absolute top-1/2 left-4 w-3 h-3 bg-yellow-500/80 rounded-full -translate-y-1/2 mix-blend-multiply"></div></div>
                                        <div className="w-10 h-6 bg-zinc-200 rounded flex items-center justify-center font-bold text-[10px] italic text-blue-800">VISA</div>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-4">
                                    <Label htmlFor="card">Card Number</Label>
                                    <Input id="card" placeholder="4242 4242 4242 4242" maxLength={19} className="h-12 rounded-none bg-background shadow-inner font-mono tracking-widest text-lg" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="exp">Expiration (MM/YY)</Label>
                                        <Input id="exp" placeholder="12/26" maxLength={5} className="h-12 rounded-none bg-background shadow-inner font-mono" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">Security Code</Label>
                                        <Input id="cvc" placeholder="123" maxLength={4} className="h-12 rounded-none bg-background shadow-inner font-mono" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Step 3: Review */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="border p-8 bg-background">
                                <h3 className="text-xl font-semibold mb-6 tracking-widest uppercase">Confirm Your Selection</h3>
                                <p className="text-muted-foreground mb-4">Please review your order details before placing the order.</p>

                                <div className="space-y-4">
                                    <div className="flex justify-between border-b pb-4">
                                        <span className="text-muted-foreground">Total Pieces</span>
                                        <span className="font-medium">{items.length}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-4">
                                        <span className="text-muted-foreground">Shipping Estimate</span>
                                        <span className="font-medium inline-flex items-center text-green-700">Free White-Glove Delivery</span>
                                    </div>
                                    <div className="flex justify-between pt-4 text-xl">
                                        <span className="font-semibold uppercase tracking-widest text-sm self-end">Grand Total</span>
                                        <span className="font-semibold">{formatPrice(getCartTotal())}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-12 pt-6 border-t">
                        {currentStep > 0 ? (
                            <Button variant="outline" onClick={handleBack} disabled={isProcessing} className="rounded-none px-8 tracking-widest uppercase h-12">
                                Back
                            </Button>
                        ) : <div />}

                        <Button onClick={handleNext} disabled={isProcessing} className="rounded-none px-12 tracking-widest uppercase h-12">
                            {currentStep === 2 ? 'Place Order' : (currentStep === 1 ? 'Verify & Continue' : 'Continue')}
                        </Button>
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-5 relative hidden lg:block">
                    <div className="sticky top-32 p-8 bg-secondary/50 border">
                        <h3 className="text-xl font-semibold tracking-widest uppercase mb-8 border-b pb-4">Order Summary</h3>
                        <div className="space-y-6 flex-1 overflow-auto max-h-[50vh] pr-2">
                            {items.map((item) => (
                                <div key={item.product.id} className="flex gap-4">
                                    <div className="relative w-20 h-20 bg-background border flex-shrink-0 group">
                                        <Image
                                            src={item.product.image}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm leading-tight mb-1">{item.product.name}</h4>
                                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                                        <p className="font-semibold mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t font-semibold flex justify-between text-lg tracking-wide">
                            <span>Total</span>
                            <span>{formatPrice(getCartTotal())}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
