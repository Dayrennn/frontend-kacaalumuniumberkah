'use client';

import { useState } from 'react';
import CardProduct from '../../card/cardProduct';
import ProdukModal from '../../modal/produkModal/page';
import { useSeeAllAdsQuery } from '@/hooks/api/companySliceAPI';

export default function Produk() {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduk, setSelectedProduk] = useState(null);
    const [activeFilter, setActiveFilter] = useState('semua');

    const { data: response } = useSeeAllAdsQuery();
    const adsList = response?.result || [];

    const allProducts = adsList.map((ads) => ({
        id: ads.id,
        image: ads.produkImageUrl,
        desc: ads.deskripsi,
        name: ads.barang?.namaBarang,
        kodeBarang: ads.barang?.kodeBarang,
        harga: ads.barang?.harga,
        ukuran: ads.barang?.ukuran,
        jenisPenjualan: ads.barang?.jenisPenjualan,
        category: ads.barang?.kategori?.namaKategori,
    }));

    // Ambil daftar kategori unik dari data barang itu sendiri (cuma ada id, tidak ada nama)
    const kategoriList = [...new Map(allProducts.map((p) => [p.category, p.category])).values()].filter(Boolean);

    const filteredProducts =
        activeFilter === 'semua' ? allProducts : allProducts.filter((p) => p.category === activeFilter);

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
                    <button
                        onClick={() => setActiveFilter('semua')}
                        className={`filter-btn px-5 py-2 rounded-xl border text-sm font-semibold shadow-sm transition-all ${
                            activeFilter === 'semua'
                                ? 'active border-blue-200 text-blue-600 bg-white'
                                : 'border-gray-200 text-gray-600 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                        }`}
                    >
                        Semua
                    </button>
                    {kategoriList.map((namaKategori) => (
                        <button
                            key={namaKategori}
                            onClick={() => setActiveFilter(namaKategori)}
                            className={`filter-btn px-5 py-2 rounded-xl border text-sm font-semibold shadow-sm transition-all ${
                                activeFilter === namaKategori
                                    ? 'active border-blue-200 text-blue-600 bg-white'
                                    : 'border-gray-200 text-gray-600 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                            }`}
                        >
                            {namaKategori}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="product-grid">
                    {filteredProducts.map((p) => (
                        <CardProduct
                            key={p.id}
                            name={p.name}
                            category={p.category}
                            image={p.image}
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
