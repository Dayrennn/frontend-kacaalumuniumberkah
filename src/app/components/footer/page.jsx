'use client';

import { useSeeAllCompanyQuery } from '@/hooks/api/companySliceAPI';
import { useSeeAllKategoriQuery } from '@/hooks/api/kategoriSliceAPI';
import { useState } from 'react';

export default function Footer() {
    const { data: response } = useSeeAllCompanyQuery();
    const companyData = response?.data || [];

    const namaPerusahaan = companyData?.namaPerusahaan || 'Berkah Kaca Alumunium';
    const lokasiPerusahaan = companyData?.lokasi;
    const telephonePerusahaan = companyData?.telephone;
    const emailPerusahaan = companyData?.email;

    const formatWhatsAppNumber = (phone) => {
        if (!phone) return '';
        // Hapus semua karakter selain angka
        let cleaned = phone.replace(/\D/g, '');
        // Kalau diawali '0', ganti jadi '62'
        if (cleaned.startsWith('0')) {
            cleaned = '62' + cleaned.slice(1);
        }
        // Kalau belum diawali '62' sama sekali (misal cuma '8123...'), tambahkan '62'
        else if (!cleaned.startsWith('62')) {
            cleaned = '62' + cleaned;
        }
        return cleaned;
    };

    const waNumber = formatWhatsAppNumber(telephonePerusahaan);
    const waLink = `https://wa.me/${waNumber}`;

    const namaWords = namaPerusahaan.trim().split(' ');
    const lastWord = namaWords[namaWords.length - 1];
    const firstWords = namaWords.slice(0, -1).join(' ');

    const { data: kategoriData } = useSeeAllKategoriQuery();
    const kategoriList = kategoriData?.data?.kategori ?? [];
    const [keyword] = useState('');
    const filtered = keyword.trim()
        ? kategoriList.filter((item) => item.namaKategori.toLowerCase().includes(keyword.toLowerCase()))
        : kategoriList;

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-gray-800">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <a href="#home" className="flex items-center gap-2 mb-4">
                            <span className="text-xl font-extrabold text-white">
                                {firstWords}
                                <span className="text-blue-400"> {lastWord}</span>
                            </span>
                        </a>
                        <p className="text-sm leading-relaxed mb-5">
                            Mitra lengkap Anda untuk bahan bangunan. Produk berkualitas, harga bersaing, dan pengiriman
                            terpercaya.
                        </p>
                        <div className="flex gap-3">
                            {[
                                ['fa-whatsapp', 'hover:bg-green-600'],
                                ['fa-facebook-f', 'hover:bg-blue-700'],
                            ].map(([icon, hover]) => (
                                <a
                                    key={icon}
                                    href="#address"
                                    className={`w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center ${hover} transition-colors`}
                                >
                                    <i className={`fa-brands ${icon} text-sm`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">Quick Links</h5>
                        <ul className="space-y-3 text-sm">
                            {[
                                ['#home', 'Home'],
                                ['#about', 'About Us'],
                                ['#products', 'Products'],
                                ['#benefit', 'Benefit'],
                                ['#address', 'Our Location'],
                                ['#contact', 'Contact Us'],
                            ].map(([href, label]) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        className="hover:text-white hover:translate-x-1 inline-block transition-all"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h5 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">Products</h5>
                        <ul className="space-y-3 text-sm">
                            {filtered.map((p) => (
                                <li key={p.id}>
                                    <a
                                        href="#products"
                                        className="hover:text-white hover:translate-x-1 inline-block transition-all"
                                    >
                                        {p.namaKategori}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h5 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">Contact</h5>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <i className="fa-solid fa-location-dot text-blue-400 mt-0.5 flex-shrink-0"></i>
                                <span>{lokasiPerusahaan}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fa-solid fa-phone text-blue-400 flex-shrink-0"></i>
                                <a href={waLink} className="hover:text-white transition-colors">
                                    {telephonePerusahaan}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fa-solid fa-envelope text-blue-400 flex-shrink-0"></i>
                                <a href="mailto:info@buildpro.id" className="hover:text-white transition-colors">
                                    {emailPerusahaan}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-sm">
                    <p>
                        © 2026 <span className="text-white font-semibold">Berkah Kaca Alumunium</span>. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </>
    );
}
