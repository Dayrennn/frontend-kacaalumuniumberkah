import Image from 'next/image';
import { ChevronDown, Headset } from 'lucide-react';
import { FaBoxOpen } from 'react-icons/fa';

export default function HeroBanner() {
    const namaPerusahaan = 'Kaca Alumunium Berkah';
    const deskripsi =
        'Distributor bahan bangunan berkualitas seperti kaca, aluminium, plafon PVC, gypsum, hollow, dan berbagai kebutuhan konstruksi lainnya.';

    const image = '/images/hero.jpg';

    return (
        <>
            <Image
                src={image}
                alt="Kaca Alumunium Berkah - Distributor Bahan Bangunan"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
            />

            {/* Overlay gradient biru dari kiri */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/70 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="max-w-xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
                        Kaca Alumunium
                        <br />
                        <span className="text-blue-300">Berkah</span>
                    </h1>

                    <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-8">{deskripsi}</p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#produk"
                            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
                        >
                            <FaBoxOpen className="w-4 h-4" />
                            Lihat Produk
                        </a>

                        <a
                            href="#kontak"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/30 transition-all"
                        >
                            <Headset className="w-4 h-4" />
                            Hubungi Kami
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 bounce-slow">
                <span className="text-xs font-medium">Scroll Kebawah</span>

                <ChevronDown className="w-4 h-4" />
            </div>
        </>
    );
}
