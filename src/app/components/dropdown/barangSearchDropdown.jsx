'use client';

import { useState, useRef, useEffect } from 'react';
import { useSeeAllBarangQuery } from '@/hooks/api/barangSliceAPI';
import { Loader2 } from 'lucide-react';

export default function BarangSearchDropdown({ value, onChange, initialLabel }) {
    const [search, setSearch] = useState(initialLabel || value || '');
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef();

    const { data: response, isLoading } = useSeeAllBarangQuery();
    const barangList = response?.data?.barang ?? [];

    const filtered = barangList.filter((k) => k.namaBarang.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSelect = (barang) => {
        setSearch(barang.namaBarang);
        onChange(barang.id);
        setOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative">
            <input
                type="text"
                placeholder="Cari barang..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-700"
            />

            {open && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-sm max-h-48 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-400">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Memuat...
                        </div>
                    ) : filtered.length === 0 ? (
                        <p className="text-sm text-gray-400 px-3 py-2.5">Tidak ditemukan</p>
                    ) : (
                        filtered.map((k) => (
                            <button
                                key={k.id}
                                type="button"
                                onClick={() => handleSelect(k)}
                                className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                                <span className="font-medium">{k.namaBarang}</span>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
