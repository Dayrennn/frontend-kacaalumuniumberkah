'use client';

import { useSeeAllCompanyQuery } from '@/hooks/api/companySliceAPI';
import Image from 'next/image';

export default function HeroBanner() {
    const { data: response } = useSeeAllCompanyQuery();
    const companyData = response?.data?.[0];

    const namaPerusahaan = companyData?.namaPerusahaan || 'Berkah Kaca Alumunium';
    const deskripsi = companyData?.deskripsiPerusahaan || '-';

    const namaWords = namaPerusahaan.trim().split(' ');
    const lastWord = namaWords[namaWords.length - 1];
    const firstWords = namaWords.slice(0, -1).join(' ');

    return (
        <>
            <Image src="/images/hero.jpg" alt="Hero Background" fill className="object-cover object-center" priority />

            {/* Overlay gradient biru dari kiri */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/70 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="max-w-xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
                        {firstWords}
                        <br />
                        <span className="text-blue-300">{lastWord}</span>
                    </h1>
                    <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-8">{deskripsi}</p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#products"
                            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
                        >
                            <i className="fa-solid fa-box-open text-sm"></i> Lihat Produk
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/30 transition-all"
                        >
                            <i className="fa-solid fa-headset text-sm"></i> Hubungi Kami
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 bounce-slow">
                <span className="text-xs font-medium">Scroll Kebawah</span>
                <i className="fa-solid fa-chevron-down text-sm"></i>
            </div>
        </>
    );
}
