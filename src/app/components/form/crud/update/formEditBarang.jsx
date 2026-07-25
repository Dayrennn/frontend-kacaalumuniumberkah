'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useModifyBarangMutation } from '@/hooks/api/barangSliceAPI';
import KategoriSearchDropdown from '@/app/components/dropdown/kategoriSearchDropdown';

export default function FormEditBarang({ initialData, onCancel, onSuccess }) {
    const [updateBarang, { isLoading, isError, error }] = useModifyBarangMutation();
    const [namaBarang, setNamaBarang] = useState(initialData?.namaBarang || '');
    const [kodeBarang, setKodeBarang] = useState(initialData?.kodeBarang || '');
    const [status, setStatus] = useState(initialData?.status || '');
    const [ukuran, setUkuran] = useState(initialData?.ukuran || '');
    const [harga, setHarga] = useState(initialData?.harga || '');
    const [jenisPenjualan, setJenisPenjualan] = useState(initialData?.jenisPenjualan || '');
    const [kategoriId, setKategoriId] = useState(initialData?.kategoriId || '');

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const result = await updateBarang({
                id: initialData.id,
                data: {
                    namaBarang,
                    kodeBarang,
                    status,
                    ukuran,
                    harga,
                    jenisPenjualan,
                    kategoriId,
                },
            }).unwrap();

            if (onSuccess) onSuccess(result);
        } catch (err) {
            console.error('ERROR', err);
        }
    };
    const errorMessage = error?.data?.message || (isError ? 'Gagal menyimpan barang.' : '');

    return (
        <form onSubmit={handleEdit} className="w-full max-w-2xl mx-auto">
            <div className="px-4 sm:px-6 py-5 space-y-4">
                {errorMessage && (
                    <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        {errorMessage}
                    </p>
                )}

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Kategori</label>
                    <KategoriSearchDropdown
                        value={kategoriId}
                        onChange={setKategoriId}
                        initialLabel={initialData?.kategori?.namaKategori}
                    />
                </div>

                {/* Nama Barang full width, Kode Barang stacks under it on mobile, side by side from sm up */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nama Barang</label>
                        <input
                            type="text"
                            value={namaBarang}
                            onChange={(e) => setNamaBarang(e.target.value)}
                            placeholder="Contoh: Alat Tulis Kantor"
                            autoFocus
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Kode Barang</label>
                        <input
                            type="text"
                            value={kodeBarang}
                            onChange={(e) => setKodeBarang(e.target.value)}
                            placeholder="Contoh: C-0123"
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Ukuran</label>
                        <input
                            type="text"
                            value={ukuran}
                            onChange={(e) => setUkuran(e.target.value)}
                            placeholder="Contoh: 30 x 30 cm"
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Harga</label>
                        <input
                            type="text"
                            value={harga}
                            onChange={(e) => setHarga(e.target.value)}
                            placeholder=""
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Jenis Penjualan</label>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                        {['PCS', 'Potongan'].map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => setJenisPenjualan(opt)}
                                className={`flex-1 min-w-[45%] sm:min-w-0 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2.5 rounded-xl border transition-colors ${
                                    jenisPenjualan === opt
                                        ? opt === 'Potongan'
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

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Status</label>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                        {['Aktif', 'Nonaktif'].map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => setStatus(opt)}
                                className={`flex-1 min-w-[45%] sm:min-w-0 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2.5 rounded-xl border transition-colors ${
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

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/50">
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
