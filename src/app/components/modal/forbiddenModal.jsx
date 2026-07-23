'use client';

import { ShieldAlert } from 'lucide-react';

export default function ForbiddenModal({ onBack }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <div className="relative w-80 mx-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                        <ShieldAlert className="w-6 h-6 text-red-500" />
                    </div>
                </div>

                <p className="text-center text-red-500 text-xs font-semibold tracking-wide mb-1">Error 403</p>
                <h2 className="text-center text-gray-900 font-bold text-lg mb-1">Akses Ditolak</h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Kamu tidak memiliki izin untuk mengakses halaman ini.
                </p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        </div>
    );
}
