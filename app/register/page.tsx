'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate registration delay
        setTimeout(() => {
            // For this mock, we just redirect to login immediately
            router.push('/login?registered=true');
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-background px-6">
            <div className="w-full max-w-md p-8 border bg-card shadow-sm">
                <h1 className="text-3xl font-semibold tracking-widest uppercase text-center mb-8">Register</h1>
                <p className="text-center text-muted-foreground mb-8 text-sm">
                    Create an account to track orders and save your curated wishlists.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" required className="h-12 rounded-none" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" required className="h-12 rounded-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required className="h-12 rounded-none" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required className="h-12 rounded-none" />
                    </div>

                    <Button type="submit" className="w-full h-12 uppercase tracking-widest rounded-none" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Account'}
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Already a member?{' '}
                    <Link href="/login" className="text-foreground underline underline-offset-4 hover:text-muted-foreground">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
