import { Product } from './types';

export const products: Product[] = [
    {
        id: 'prod-1',
        name: 'The Boucle Haven Sofa',
        slug: 'boucle-haven-sofa',
        category: 'Living Room',
        price: 185000,
        image: '/products/product-1.png',
        description: 'A masterpiece of mid-century modern design, this off-white boucle sofa offers unparalleled comfort with a minimalist aesthetic. Soft natural lines and deep seating make it the perfect centerpiece for any contemporary living room.',
        dimensions: {
            width: '220 cm',
            depth: '95 cm',
            height: '75 cm',
        },
        materials: ['Solid Oak Frame', 'High-Density Foam', 'Premium Boucle Fabric'],
        featured: true,
    },
    {
        id: 'prod-2',
        name: 'Walnut & Cream Armchair',
        slug: 'walnut-cream-armchair',
        category: 'Living Room',
        price: 75000,
        image: '/products/product-2.png',
        description: 'Elegant armchair featuring a sculptured walnut wood frame and a plush cream leather cushion. Designed for both visual impact and long-lasting comfort.',
        dimensions: {
            width: '70 cm',
            depth: '85 cm',
            height: '80 cm',
        },
        materials: ['Solid American Walnut', 'Top-Grain Leather'],
        featured: true,
    },
    {
        id: 'prod-3',
        name: 'Travertine Dining Table',
        slug: 'travertine-dining-table',
        category: 'Living Room',
        price: 240000,
        image: '/products/product-3.png',
        description: 'A monumental dining table crafted from solid travertine stone, paired with understated brass legs. A bold architectural statement for dining spaces.',
        dimensions: {
            width: '240 cm',
            depth: '110 cm',
            height: '76 cm',
        },
        materials: ['Solid Travertine Stone', 'Brushed Brass Base'],
        featured: true,
    },
    {
        id: 'prod-4',
        name: 'Pale Ash Low-Profile Bed',
        slug: 'pale-ash-low-profile-bed',
        category: 'Bedroom',
        price: 155000,
        image: '/products/product-4.png',
        description: 'Minimalist platform bed frame in pale ash wood with an integrated, low-profile headboard. Brings a sense of calm and spaciousness to the bedroom.',
        dimensions: {
            width: '200 cm',
            depth: '220 cm',
            height: '85 cm',
        },
        materials: ['Solid Ash Wood', 'Ash Veneer'],
        featured: false,
    },
    {
        id: 'prod-5',
        name: 'Smoked Oak Minimalist Desk',
        slug: 'smoked-oak-minimalist-desk',
        category: 'Office',
        price: 68000,
        image: '/products/product-5.png',
        description: 'Clean-lined workspace essential featuring a smoked oak top resting on slender black steel hairpin legs. Perfect for focused luxury.',
        dimensions: {
            width: '140 cm',
            depth: '70 cm',
            height: '75 cm',
        },
        materials: ['Smoked Oak Veneer', 'Powder-coated Steel'],
        featured: false,
    },
    {
        id: 'prod-6',
        name: 'Rattan & Brass Bookshelf',
        slug: 'rattan-brass-bookshelf',
        category: 'Living Room',
        price: 110000,
        image: '/products/product-6.png',
        description: 'Tall open shelving unit marrying natural rattan textures with a solid brass frame. An airy display space for books and objects.',
        dimensions: {
            width: '90 cm',
            depth: '40 cm',
            height: '210 cm',
        },
        materials: ['Natural Rattan', 'Solid Brass'],
        featured: false,
    },
    // Placeholders for remaining images using Unsplash
    {
        id: 'prod-7',
        name: 'Carrara Marble Side Table',
        slug: 'carrara-marble-side-table',
        category: 'Living Room',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80',
        description: 'A delicate side table featuring a honed Carrara marble top resting on a brushed gold sculptural base.',
        dimensions: {
            width: '45 cm',
            depth: '45 cm',
            height: '55 cm',
        },
        materials: ['Carrara Marble', 'Brushed Brass'],
        featured: false,
    },
    {
        id: 'prod-8',
        name: 'Matte Black Arc Floor Lamp',
        slug: 'matte-black-arc-floor-lamp',
        category: 'Living Room',
        price: 32000,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80',
        description: 'Dramatic overhanging arc lamp in matte black, featuring a textured linen drum shade for soft, diffused illumination.',
        dimensions: {
            width: '180 cm',
            depth: '40 cm',
            height: '220 cm',
        },
        materials: ['Steel', 'Linen', 'Marble Base'],
        featured: false,
    },
    {
        id: 'prod-9',
        name: 'Lounge Chair with Ottoman',
        slug: 'lounge-chair-ottoman',
        category: 'Living Room',
        price: 135000,
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80',
        description: 'The ultimate reading chair. Reclined shell design upholstered in supple cognac leather, complete with matching footrest.',
        dimensions: {
            width: '85 cm',
            depth: '90 cm',
            height: '95 cm',
        },
        materials: ['Molded Plywood', 'Cognac Leather', 'Aluminum Cast Base'],
        featured: false,
    },
    {
        id: 'prod-10',
        name: 'Minimalist Nightstand',
        slug: 'minimalist-nightstand',
        category: 'Bedroom',
        price: 38000,
        image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80',
        description: 'Floating-style nightstand with a single soft-close drawer. Finished in matte white with an integrated handle.',
        dimensions: {
            width: '50 cm',
            depth: '40 cm',
            height: '45 cm',
        },
        materials: ['MDF', 'Matte Lacquer'],
        featured: false,
    }
];

export const getProductsByCategory = (category: string) => {
    if (category === 'All') return products;
    return products.filter((p) => p.category === category);
};

export const getFeaturedProducts = () => {
    return products.filter((p) => p.featured);
};

export const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
};
