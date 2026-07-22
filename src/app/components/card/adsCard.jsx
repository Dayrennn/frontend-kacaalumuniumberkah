'use client';

import { ImageOff, Pencil, Trash2 } from 'lucide-react';
import StatusBadge from '../badge/statusBadge';

export default function AdsCard({ item, onEdit, onDelete }) {
    const imageUrl = item.produkImageUrl ? `${item.produkImageUrl}` : null;

    return (
        <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            {/* Gambar */}
            <div className="relative aspect-4/3 bg-gray-50 overflow-hidden">
                {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageUrl}
                        alt={item.barang?.namaBarang || 'Produk'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-gray-300">
                        <ImageOff className="w-7 h-7" />
                        <span className="text-[11px] font-medium">Tidak ada gambar</span>
                    </div>
                )}

                {item.barang?.kategori?.namaKategori && (
                    <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur text-[11px] font-semibold text-blue-700 px-2.5 py-1 rounded-lg shadow-sm">
                        {item.barang.kategori.namaKategori}
                    </span>
                )}

                {/* Aksi hover */}
                <div className="absolute top-2.5 right-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        title="Edit produk"
                        onClick={() => onEdit?.(item)}
                        className="p-1.5 rounded-lg bg-white/90 backdrop-blur text-gray-500 hover:text-blue-600 shadow-sm"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                        title="Hapus produk"
                        onClick={() => onDelete?.(item)}
                        className="p-1.5 rounded-lg bg-white/90 backdrop-blur text-gray-500 hover:text-red-500 shadow-sm"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Konten */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug">{item.barang?.namaBarang}</h3>
                    {item.barang?.status && <StatusBadge status={item.barang.status} />}
                </div>
                <p className="text-[11px] font-medium text-gray-400 mt-1">{item.barang?.ukuran}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-3 flex-1">{item.deskripsi}</p>
            </div>
        </div>
    );
}
