'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const featured = getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image
            src="/products/product-1.png"
            alt="Aura Home luxury interior"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-background/20" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-semibold tracking-widest uppercase mb-6 drop-shadow-md text-foreground"
          >
            Aura Home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-foreground font-medium mb-10 max-w-2xl text-shadow-sm"
          >
            Curated mid-century modern masterpieces that elevate your sanctuary. Quiet luxury for the discerning eye.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <Link href="/showcase">
              <Button size="lg" className="rounded-none px-12 py-6 text-lg tracking-widest uppercase shadow-xl hover:-translate-y-1 transition-transform">
                Enter Showcase
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-widest uppercase mb-4">
                The Heritage Collection
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover our signature pieces. Rooted in timeless mid-century design and crafted from the finest organic materials.
              </p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="rounded-none tracking-widest uppercase border-foreground/20 hover:border-foreground">
                View All Pieces
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Split */}
      <section className="py-0 bg-secondary flex flex-col md:flex-row min-h-[70vh]">
        <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80"
            alt="Craftsmanship"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
          <h2 className="text-3xl tracking-widest uppercase mb-8">Artisanal Craftsmanship</h2>
          <div className="space-y-6 text-muted-foreground whitespace-pre-line leading-relaxed">
            <p>Every piece in the Aura Home collection is a testament to uncompromised quality.</p>
            <p>We partner with master woodworkers and textile artisans who share our obsession with detail. From the hand-rubbed finish of solid walnut to the meticulous channeling of full-grain leather, the difference is tactile.</p>
            <p>Design that doesn't scream for attention, but commands it through presence.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
