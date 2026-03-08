'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError('Invalid credentials. Use password "password" to test.');
            setIsLoading(false);
        } else {
            router.push('/');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-background px-6">
            <div className="w-full max-w-md p-8 border bg-card shadow-sm">
                <h1 className="text-3xl font-semibold tracking-widest uppercase text-center mb-8">Sign In</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="p-3 bg-red-100 text-red-800 text-sm">{error}</div>}
                    <div className="text-sm text-muted-foreground p-3 border bg-secondary/50">
                        <strong>Demo Account:</strong> Any email with password `password`.
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jane@example.com"
                            required
                            className="h-12 rounded-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12 rounded-none"
                        />
                    </div>

                    <Button type="submit" className="w-full h-12 uppercase tracking-widest rounded-none" disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-foreground underline underline-offset-4 hover:text-muted-foreground">
                        Register Collection Access
                    </Link>
                </div>
            </div>
        </div>
    );
}
