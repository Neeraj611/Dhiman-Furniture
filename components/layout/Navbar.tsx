'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CartSidebar } from '@/components/ui/CartSidebar';
import { useSession, signOut } from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const itemCount = useCartStore((state) => state.getItemCount());

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Showcase', href: '/showcase' },
        { name: 'Shop', href: '/shop' },
    ];

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
                    isScrolled
                        ? 'bg-background/80 backdrop-blur-md border-b shadow-sm py-4'
                        : 'bg-transparent py-6'
                )}
            >
                <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex-1">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -ml-2 text-foreground">
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {/* Nav Links (Desktop) */}
                    <nav className="hidden md:flex flex-1 items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Logo */}
                    <div className="flex-1 flex justify-center">
                        <Link href="/" className="text-2xl font-semibold tracking-[0.2em] uppercase">
                            Dhiman Furniture
                        </Link>
                    </div>

                    {/* Right Area (Auth + Cart) */}
                    <div className="flex-1 flex justify-end items-center gap-4">

                        {/* Auth Link / Avatar */}
                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="hidden md:flex outline-none">
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border hover:bg-secondary/80 transition-colors">
                                        <span className="text-xs font-semibold uppercase">
                                            {session.user?.name?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 rounded-none">
                                    <DropdownMenuLabel className="font-normal text-xs text-muted-foreground uppercase tracking-widest">
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/orders')}>Orders</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Wishlist</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer focus:bg-destructive/10" onClick={() => signOut()}>
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login" className="hidden md:flex text-sm font-medium uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors">
                                Sign In
                            </Link>
                        )}

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-foreground hover:text-muted-foreground transition-colors"
                        >
                            <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
                            {isMounted && itemCount > 0 && (
                                <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-md py-4 px-6 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium tracking-wide"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="my-2" />
                        {session ? (
                            <>
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                    Hello, {session.user?.name}
                                </span>
                                <button className="text-left text-lg font-medium tracking-wide" onClick={() => signOut()}>Sign out</button>
                            </>
                        ) : (
                            <Link href="/login" className="text-lg font-medium tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                        )}
                    </div>
                )}
            </header>

            <CartSidebar isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
        </>
    );
}
