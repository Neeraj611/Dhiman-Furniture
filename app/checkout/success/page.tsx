'use client';

import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, Download, MessageCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const orderId = searchParams.get('orderId') || `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
    const [dateStr, setDateStr] = useState('');

    useEffect(() => {
        // Only set date on client to avoid hydration mismatch
        setDateStr(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleWhatsApp = () => {
        // WhatsApp deep link formatting
        const phone = '1234567890'; // Replace with actual business number
        const message = `Hello Aura Home, I just completed payment for order ${orderId}. Can I get an estimated delivery date?`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="pt-32 pb-24 min-h-[85vh] flex flex-col lg:flex-row gap-12 items-start justify-center px-6 max-w-6xl mx-auto bg-background">

            {/* Left Column: Confirmation Message & Actions */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full lg:w-1/2 flex flex-col items-start pt-8"
            >
                <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mb-6 text-background shadow-xl">
                    <Check strokeWidth={3} className="w-8 h-8" />
                </div>

                <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-widest uppercase">
                    Payment Successful
                </h1>

                <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-md">
                    Thank you for choosing Aura Home. Your transaction was processed securely. A bespoke experience awaits.
                </p>

                <div className="flex flex-col sm:flex-row w-full gap-4 mb-12">
                    <Button
                        onClick={handleWhatsApp}
                        className="rounded-none h-14 tracking-widest uppercase font-medium text-sm flex-1 bg-green-700 hover:bg-green-800 text-white"
                    >
                        <MessageCircle className="mr-2 h-5 w-5" /> Track via WhatsApp
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handlePrint}
                        className="rounded-none h-14 tracking-widest uppercase font-medium text-sm flex-1 border-foreground/20 print:hidden"
                    >
                        <Download className="mr-2 h-5 w-5" /> Save Slip
                    </Button>
                </div>

                <Button
                    variant="link"
                    onClick={() => router.push('/')}
                    className="rounded-none px-0 tracking-widest uppercase font-medium text-sm text-foreground print:hidden hover:no-underline hover:text-muted-foreground transition-colors"
                >
                    ← Return to Home
                </Button>
            </motion.div>

            {/* Right Column: Payment Slip (Printable Area) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="w-full lg:w-1/2 max-w-md print:max-w-none print:w-full print:absolute print:inset-0 print:m-0 print:p-8"
            >
                <div className="bg-white text-black p-8 sm:p-10 border shadow-2xl relative overflow-hidden">
                    {/* Watermark logo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-bold text-black/5 select-none pointer-events-none uppercase tracking-tighter">
                        AURA
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10 border-b pb-6">
                            <div>
                                <h2 className="text-2xl font-semibold tracking-widest uppercase mb-1">Aura Home</h2>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">Client Payment Slip</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Date</p>
                                <p className="font-medium text-sm">{dateStr}</p>
                            </div>
                        </div>

                        <div className="mb-8 space-y-4">
                            <div className="grid grid-cols-2 text-sm gap-2">
                                <span className="text-gray-500 uppercase tracking-widest text-xs">Order Number</span>
                                <span className="font-semibold text-right font-mono">{orderId}</span>
                            </div>
                            <div className="grid grid-cols-2 text-sm gap-2">
                                <span className="text-gray-500 uppercase tracking-widest text-xs">Client</span>
                                <span className="font-medium text-right truncate">{session?.user?.name || session?.user?.email || 'Guest Client'}</span>
                            </div>
                            <div className="grid grid-cols-2 text-sm gap-2">
                                <span className="text-gray-500 uppercase tracking-widest text-xs">Payment Method</span>
                                <span className="font-medium text-right">Secure Encrypted Card</span>
                            </div>
                            <div className="grid grid-cols-2 text-sm gap-2">
                                <span className="text-gray-500 uppercase tracking-widest text-xs">Status</span>
                                <span className="font-medium text-right text-green-700">PAID</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-sm border mb-8">
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 text-center">Important Notice</p>
                            <p className="text-xs text-center text-gray-600 leading-relaxed">
                                Keep this slip for your records. White-glove delivery scheduling will commence within 24-48 business hours.
                            </p>
                        </div>

                        <div className="border-t pt-4 text-center">
                            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Thank you for your patronage</p>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading receipt...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
