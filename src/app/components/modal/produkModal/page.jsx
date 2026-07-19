'use client';

import Image from 'next/image';
import { useSeeAllCompanyQuery } from '@/hooks/api/companySliceAPI';

export default function ProdukModal({ product, onClose }) {
    const { data: response } = useSeeAllCompanyQuery();
    const companyData = response?.data?.[0];

    const telephonePerusahaan = companyData?.telephone;

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

    if (!product) return null;

    const formattedHarga = product.harga
        ? new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
          }).format(product.harga)
        : null;

    return (
        <div
            className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="modal-content bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Gambar Produk */}
                <div className="relative w-full h-56 bg-gray-100">
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name || 'Produk'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 448px) 100vw, 448px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            Tidak ada gambar
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all"
                        aria-label="Tutup"
                    >
                        <i className="fa-solid fa-xmark text-gray-700"></i>
                    </button>

                    {product.status && (
                        <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            {product.status}
                        </span>
                    )}
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                        {product.category && (
                            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                                {product.category}
                            </span>
                        )}
                        {product.kodeBarang && <span className="text-gray-400 text-xs">{product.kodeBarang}</span>}
                    </div>

                    <h3 className="text-xl font-extrabold text-gray-900 mb-1">{product.name}</h3>

                    {formattedHarga && (
                        <p className="text-blue-600 font-bold text-lg mb-3">
                            {formattedHarga}
                            {product.jenisPenjualan && (
                                <span className="text-gray-400 text-sm font-normal"> / {product.jenisPenjualan}</span>
                            )}
                        </p>
                    )}

                    {product.ukuran && (
                        <p className="text-gray-500 text-sm mb-1">
                            <span className="font-semibold text-gray-600">Ukuran:</span> {product.ukuran}
                        </p>
                    )}

                    {product.desc && <p className="text-gray-500 text-sm leading-relaxed mt-3 mb-6">{product.desc}</p>}

                    <div className="flex gap-3 mt-6">
                        <a
                            href={waLink}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm"
                        >
                            <i className="fa-brands fa-whatsapp text-lg"></i> Tanya Produk Ini
                        </a>
                        <button
                            onClick={onClose}
                            className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
