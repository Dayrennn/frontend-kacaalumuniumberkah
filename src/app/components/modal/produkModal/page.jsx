'use client';

import Image from "next/image";

export default function ProdukModal({ product, onClose }) {
    if (!product) return null;

    return (
        <div
            className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="modal-content bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header dengan gradient sesuai tema cta-banner */}
                <div
                    className="relative h-32 flex items-center justify-center"
                    style={product.bg ? { background: product.bg } : { background: '#dbeafe' }}
                >
                    <Image src={product.image} alt={product.name} width={120} height={120} />

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all"
                        aria-label="Tutup"
                    >
                        <i className="fa-solid fa-xmark text-gray-700"></i>
                    </button>

                    <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Available
                    </span>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`${product.badge} text-xs font-semibold px-2.5 py-1 rounded-full`}>
                            {product.badgeLabel}
                        </span>
                        <span className="text-gray-400 text-xs capitalize">{product.category}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-gray-900 mb-3">{product.name}</h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.desc}</p>

                    <div className="flex gap-3">
                        <a
                            href="https://wa.me/628112345678"
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