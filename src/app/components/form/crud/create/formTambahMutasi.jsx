'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAddBarangMasukMutation } from '@/hooks/api/mutasiSliceAPI';
import BarangSearchDropdown from '@/app/components/dropdown/barangSearchDropdown';

export default function FormTambahBarangMasuk({ onCancel, onSuccess }) {
    const [createBarangMasuk, { isLoading, isError, error }] = useAddBarangMasukMutation();
    const [barangId, setBarangId] = useState(null);
    const [jumlah, setJumlah] = useState(0);
    const [keterangan, setKeterangan] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const result = await createBarangMasuk({
                data: {
                    barangId,
                    jumlah: Number(jumlah),
                    keterangan,
                },
            }).unwrap();

            setBarangId(null);
            setJumlah('');
            setKeterangan('');

            if (onSuccess) {
                onSuccess(result);
            }
        } catch (err) {
            console.error('ERROR', err);
        }
    };
    const errorMessage = error?.data?.message || (isError ? 'Gagal menyimpan mutasi.' : '');

    return (
        <form onSubmit={handleCreate}>
            <div className="px-6 py-5 space-y-4">
                {errorMessage && (
                    <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        {errorMessage}
                    </p>
                )}

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Kategori</label>
                    <BarangSearchDropdown value={barangId} onChange={setBarangId} />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Jumlah Barang</label>
                    <input
                        type="text"
                        value={jumlah}
                        onChange={(e) => setJumlah(e.target.value)}
                        placeholder="Contoh: 400"
                        autoFocus
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Kode Barang</label>
                    <input
                        type="text"
                        value={keterangan}
                        onChange={(e) => setKeterangan(e.target.value)}
                        placeholder="Contoh: C-0123"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                    />
                </div>
            </div>

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
                        'Simpan Barang'
                    )}
                </button>
            </div>
        </form>
    );
}
