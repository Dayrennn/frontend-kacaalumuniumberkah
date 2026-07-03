'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useModifyKategoriMutation } from '@/hooks/api/kategoriSliceAPI';

export default function FormEditKategori({ initialData, onCancel, onSuccess }) {
    const [updateKategori, { isLoading, isError, error }] = useModifyKategoriMutation();
    const [namaKategori, setNamaKategori] = useState(initialData?.namaKategori || '');
    const [status, setStatus] = useState(initialData?.status || 'Aktif');

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const result = await updateKategori({
                id: initialData.id,
                data: {
                    namaKategori,
                    status,
                },
            }).unwrap();

            if (onSuccess) onSuccess(result);
        } catch (err) {
            console.error('ERROR', err);
        }
    };

    const errorMessage = error?.data?.message || (isError ? 'Gagal menyimpan kategori.' : '');

    return (
        <>
            <form onSubmit={handleEdit}>
                <div className="px-6 py-5 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nama Kategori</label>
                        <input
                            type="text"
                            value={namaKategori}
                            onChange={(e) => setNamaKategori(e.target.value)}
                            placeholder="Contoh: Alat Tulis Kantor"
                            autoFocus
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />
                        {errorMessage && <p className="text-xs text-red-500 mt-1.5">{errorMessage}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Status</label>
                        <div className="flex items-center gap-2">
                            {['Aktif', 'Nonaktif'].map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setStatus(opt)}
                                    className={`flex-1 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-colors ${
                                        status === opt
                                            ? opt === 'Aktif'
                                                ? 'bg-green-50 border-green-200 text-green-700'
                                                : 'bg-amber-50 border-amber-200 text-amber-700'
                                            : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition-colors text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm disabled:opacity-60"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            'Simpan Kategori'
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}
