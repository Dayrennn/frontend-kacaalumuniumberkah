'use client';

import { useState } from 'react';
import CardProduct from '../../card/cardProduct';
import ProdukModal from '../../modal/produkModal/page';

const PRODUCTS = [
    {
        category: 'gypsum',
        image: '/images/product/5006.jpg',
        bg: null,
        badge: 'bg-blue-50 text-blue-700',
        badgeLabel: 'Gypsum',
        name: 'Gypsum Board Standard',
        desc: '9mm regular gypsum board for interior walls and ceilings. Smooth finish, easy to cut.',
    },
    {
        category: 'gypsum',
        image: '/images/product/5006.jpg',
        bg: null,
        badge: 'bg-blue-50 text-blue-700',
        badgeLabel: 'Gypsum',
        name: 'Gypsum Board Moisture Resist',
        desc: 'Water-resistant gypsum board, ideal for bathrooms and humid areas. Green-tinted.',
    },
    {
        category: 'gypsum',
        image: '/images/product/5006.jpg',
        bg: null,
        badge: 'bg-blue-50 text-blue-700',
        badgeLabel: 'Gypsum',
        name: 'Gypsum Compound Putty',
        desc: 'Ready-mixed compound for jointing gypsum boards. Fast-dry formula, minimal shrinkage.',
    },
    {
        category: 'pvc',
        icon: 'fa-border-top-left',
        iconColor: 'text-sky-400',
        bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)',
        badge: 'bg-sky-50 text-sky-700',
        badgeLabel: 'PVC Ceiling',
        name: 'PVC Panel Ceiling 8mm',
        desc: 'Lightweight, waterproof PVC ceiling panel. Variety of motifs, easy interlocking installation.',
    },
    {
        category: 'pvc',
        icon: 'fa-border-top-left',
        iconColor: 'text-sky-400',
        bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)',
        badge: 'bg-sky-50 text-sky-700',
        badgeLabel: 'PVC Ceiling',
        name: 'PVC Ceiling List / Cornice',
        desc: 'Decorative PVC coving for ceiling edges. Various profile sizes, paintable surface.',
    },
    {
        category: 'hollow',
        icon: 'fa-grip-lines',
        iconColor: 'text-slate-400',
        bg: 'linear-gradient(135deg,#f1f5f9,#e2e8f0)',
        badge: 'bg-gray-100 text-gray-700',
        badgeLabel: 'Hollow',
        name: 'Hollow Steel 4×4 cm',
        desc: 'Square hollow steel section for partitions and ceiling frames. Galvanized anti-rust coating.',
    },
    {
        category: 'hollow',
        icon: 'fa-grip-lines',
        iconColor: 'text-slate-400',
        bg: 'linear-gradient(135deg,#f1f5f9,#e2e8f0)',
        badge: 'bg-gray-100 text-gray-700',
        badgeLabel: 'Hollow',
        name: 'Metal Furring Channel',
        desc: 'Cold-rolled steel furring for ceiling substrates. Lightweight yet high-load bearing capacity.',
    },
    {
        category: 'accessories',
        icon: 'fa-screwdriver-wrench',
        iconColor: 'text-green-500',
        bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
        badge: 'bg-green-50 text-green-700',
        badgeLabel: 'Accessories',
        name: 'Drywall Screws 3.5×25mm',
        desc: 'Black phosphate coated bugle-head screws. Box of 1000 units. Self-tapping tip.',
    },
    {
        category: 'accessories',
        icon: 'fa-screwdriver-wrench',
        iconColor: 'text-green-500',
        bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
        badge: 'bg-green-50 text-green-700',
        badgeLabel: 'Accessories',
        name: 'Paper Joint Tape 50m',
        desc: 'High-strength paper tape for gypsum board joints. Prevents cracking and easy feathering.',
    },
    {
        category: 'accessories',
        icon: 'fa-screwdriver-wrench',
        iconColor: 'text-green-500',
        bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
        badge: 'bg-green-50 text-green-700',
        badgeLabel: 'Accessories',
        name: 'Wall Angle Metal Trim',
        desc: 'Galvanized L-angle perimeter trim for ceiling partitions. 3m length, 0.4mm gauge.',
    },
];

const FILTERS = [
    ['semua', 'Semua'],
    ['gypsum', 'Gypsum'],
    ['pvc', 'Plavon PVC'],
    ['hollow', 'Kaca'],
    ['accessories', 'Aksesoris'],
];

export default function Produk() {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduk, setSelectedProduk] = useState(null);

    const [activeFilter, setActiveFilter] = useState('semua');

    const filteredProducts = activeFilter === 'semua' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeFilter);
    const handleClick = (produk) => {
        setSelectedProduk(produk);
        setShowDetail(true);
    };
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <div className="section-tag mx-auto"></div>
                    <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">
                        Apa yang kita miliki
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Produk Kami</h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-base">
                        Jelajahi seluruh rangkaian bahan bangunan kami, disaring berdasarkan kategori untuk kenyamanan
                        Anda.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-10" id="filter-buttons">
                    {FILTERS.map(([val, label]) => (
                        <button
                            key={val}
                            onClick={() => setActiveFilter(val)}
                            className={`filter-btn px-5 py-2 rounded-xl border text-sm font-semibold shadow-sm transition-all ${activeFilter === val ? 'active border-blue-200 text-blue-600 bg-white' : 'border-gray-200 text-gray-600 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="product-grid">
                    {filteredProducts.map((p, i) => (
                        <CardProduct
                            key={p.name}
                            name={p.name}
                            category={p.category}
                            bg={p.bg}
                            image={p.image}
                            badge={p.badge}
                            badgeLabel={p.badgeLabel}
                            desc={p.desc}
                            onViewDetail={() => handleClick(p)}
                        />
                    ))}
                </div>
                {showDetail && <ProdukModal product={selectedProduk} onClose={() => setShowDetail(false)} />}
            </div>
        </>
    );
}
