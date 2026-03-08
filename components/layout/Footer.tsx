import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-foreground text-background py-16 px-6">
            <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <Link href="/" className="text-2xl font-semibold tracking-[0.2em] uppercase">
                        Aura Home
                    </Link>
                    <p className="text-background/70 max-w-xs text-sm mt-4 leading-relaxed">
                        Quiet luxury for the modern sanctuary. We curate mid-century modern pieces that elevate everyday living into an art form.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-semibold tracking-widest uppercase mb-6 text-sm">Explore</h4>
                    <ul className="space-y-3 text-sm text-background/70">
                        <li><Link href="/shop" className="hover:text-background transition-colors">Shop All</Link></li>
                        <li><Link href="/showcase" className="hover:text-background transition-colors">Showcase</Link></li>
                        <li><Link href="/about" className="hover:text-background transition-colors">Our Story</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="font-semibold tracking-widest uppercase mb-6 text-sm">Categories</h4>
                    <ul className="space-y-3 text-sm text-background/70">
                        <li><Link href="/shop?category=Living Room" className="hover:text-background transition-colors">Living Room</Link></li>
                        <li><Link href="/shop?category=Bedroom" className="hover:text-background transition-colors">Bedroom</Link></li>
                        <li><Link href="/shop?category=Office" className="hover:text-background transition-colors">Office</Link></li>
                    </ul>
                </div>

                {/* Social & Newsletter */}
                <div>
                    <h4 className="font-semibold tracking-widest uppercase mb-6 text-sm">Connect</h4>
                    <div className="flex gap-4 mb-6">
                        <a href="https://www.instagram.com/dh1man_furnitures?igsh=MWd2YnZoemRrYmozbA==" className="text-background/70 hover:text-background transition-colors">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-background/70 hover:text-background transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="https://www.facebook.com/share/183JhTYYSc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">
                            <Facebook className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl mt-16 pt-8 border-t border-background/20 text-center text-xs text-background/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Aura Home. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-background transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
