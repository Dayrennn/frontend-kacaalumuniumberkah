'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useCreateBarangMutation } from '@/hooks/api/barangSliceAPI';
import KategoriSearchDropdown from '@/app/components/dropdown/kategoriSearchDropdown';

export default function FormTambahBarang({ onCancel, onSuccess }) {
    const [createBarang, { isLoading, isError, error }] = useCreateBarangMutation();
    const [namaBarang, setNamaBarang] = useState('');
    const [kodeBarang, setKodeBarang] = useState('');
    const [jumlahBarang, setJumlahBarang] = useState('');
    const [ukuran, setUkuran] = useState('');
    const [kategoriId, setKategoriId] = useState(null);
    const [status, setStatus] = useState('Aktif');

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const result = await createBarang({
                data: {
                    namaBarang,
                    kodeBarang,
                    jumlahBarang: Number(jumlahBarang),
                    ukuran,
                    status,
                    kategoriId,
                },
            }).unwrap();

            const namaBarangSuccess = namaBarang;

            setNamaBarang('');
            setKodeBarang('');
            setJumlahBarang('');
            setUkuran('');
            setStatus('Aktif');
            setKategoriId(null);

            if (onSuccess) {
                onSuccess(result, {
                    namaBarang: namaBarangSuccess,
                });
            }
        } catch (err) {
            console.error('ERROR', err);
        }
    };

    const errorMessage = error?.data?.message || (isError ? 'Gagal menyimpan barang.' : '');

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
                    <KategoriSearchDropdown value={kategoriId} onChange={setKategoriId} />
                </div>

                <div>
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
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Jumlah Barang</label>
                    <input
                        type="number"
                        value={jumlahBarang}
                        onChange={(e) => setJumlahBarang(e.target.value)}
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
