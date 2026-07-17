'use client';

import { useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { useAddBarangKeluarMutation } from '@/hooks/api/mutasiSliceAPI';
import BarangSearchDropdown from '@/app/components/dropdown/barangSearchDropdown';

const formatRupiah = (angka) => {
    if (!angka && angka !== 0) return '-';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(angka);
};

export default function FormTambahBarangKeluar({ onCancel, onSuccess }) {
    const [createBarangKeluar, { isLoading, isError, error }] = useAddBarangKeluarMutation();
    const [barangId, setBarangId] = useState(null);
    const [selectedBarang, setSelectedBarang] = useState(null); // <-- simpan objek barang terpilih
    const [jumlah, setJumlah] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [ambilDariLembaran, setAmbilDariLembaran] = useState(null); // <-- true / false / null
    const [panjangCustom, setPanjangCustom] = useState('');
    const [lebarCustom, setLebarCustom] = useState('');
    const [customer, setCustomer] = useState('');

    const isPotongan = selectedBarang?.jenisPenjualan === 'Potongan';

    const handleSelectBarang = (id, barang) => {
        setBarangId(id);
        setSelectedBarang(barang);
        setAmbilDariLembaran(null); // reset tiap ganti barang
        setPanjangCustom('');
        setLebarCustom('');
    };

    // preview harga real-time, dihitung ulang tiap input berubah
    const { hargaPerUnit, totalHarga } = useMemo(() => {
        if (!selectedBarang) return { hargaPerUnit: null, totalHarga: null };

        const jml = Number(jumlah) || 0;

        if (isPotongan) {
            const p = Number(panjangCustom) || 0;
            const l = Number(lebarCustom) || 0;
            if (p <= 0 || l <= 0 || jml <= 0) return { hargaPerUnit: null, totalHarga: null };

            const perUnit = (p * l * selectedBarang.harga) / 10000;
            return {
                hargaPerUnit: Math.round(perUnit),
                totalHarga: Math.round(perUnit * jml),
            };
        }

        if (jml <= 0) return { hargaPerUnit: null, totalHarga: null };
        return {
            hargaPerUnit: selectedBarang.harga,
            totalHarga: Math.round(selectedBarang.harga * jml),
        };
    }, [selectedBarang, isPotongan, jumlah, panjangCustom, lebarCustom]);

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const result = await createBarangKeluar({
                data: {
                    barangId,
                    jumlah: Number(jumlah),
                    keterangan,
                    customer,
                    ...(isPotongan && {
                        ambilDariLembaran,
                        panjangCustom: Number(panjangCustom),
                        lebarCustom: Number(lebarCustom),
                    }),
                },
            }).unwrap();

            setBarangId(null);
            setSelectedBarang(null);
            setJumlah('');
            setKeterangan('');
            setAmbilDariLembaran(null);
            setPanjangCustom('');
            setLebarCustom('');
            setCustomer('');

            if (onSuccess) {
                onSuccess(result);
            }
        } catch (err) {
            console.error('ERROR', err);
        }
    };

    const errorMessage = error?.data?.message || (isError ? 'Gagal menyimpan mutasi.' : '');

    const isSubmitDisabled =
        isLoading ||
        !barangId ||
        !jumlah ||
        (isPotongan && ambilDariLembaran === null) ||
        (isPotongan && (!panjangCustom || !lebarCustom));

    return (
        <form onSubmit={handleCreate} className="flex flex-col max-h-[85vh] sm:max-h-[80vh]">
            <div className="px-4 sm:px-6 py-5 space-y-4 overflow-y-auto">
                {errorMessage && (
                    <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        {errorMessage}
                    </p>
                )}

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Barang</label>
                    <BarangSearchDropdown value={barangId} onChange={handleSelectBarang} />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Customer</label>
                    <input
                        type="text"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        placeholder="Contoh: Udin"
                        autoFocus
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                    />
                </div>

                {/* Muncul hanya kalau barang yang dipilih jenisPenjualan-nya Potongan */}
                {isPotongan && (
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Sumber Bahan</label>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setAmbilDariLembaran(true)}
                                className={`flex-1 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-colors ${
                                    ambilDariLembaran === true
                                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                                        : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'
                                }`}
                            >
                                Ambil dari Lembaran
                            </button>
                            <button
                                type="button"
                                onClick={() => setAmbilDariLembaran(false)}
                                className={`flex-1 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-colors ${
                                    ambilDariLembaran === false
                                        ? 'bg-amber-50 border-amber-200 text-amber-700'
                                        : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'
                                }`}
                            >
                                Sisa Potongan
                            </button>
                        </div>
                        {ambilDariLembaran === false && (
                            <p className="text-xs text-gray-400 mt-1.5">
                                Stok tidak akan berkurang karena diambil dari sisa potongan.
                            </p>
                        )}
                    </div>
                )}

                {/* Input ukuran custom, hanya untuk barang Potongan */}
                {isPotongan && (
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                                Panjang Custom (cm)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={panjangCustom}
                                onChange={(e) => setPanjangCustom(e.target.value)}
                                placeholder="Contoh: 100"
                                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                                Lebar Custom (cm)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={lebarCustom}
                                onChange={(e) => setLebarCustom(e.target.value)}
                                placeholder="Contoh: 90"
                                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                        {isPotongan ? 'Jumlah Potongan' : 'Jumlah Barang'}
                    </label>
                    <input
                        type="number"
                        value={jumlah}
                        onChange={(e) => setJumlah(e.target.value)}
                        placeholder={isPotongan ? 'Contoh: 2' : 'Contoh: 400'}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Keterangan</label>
                    <input
                        type="text"
                        value={keterangan}
                        onChange={(e) => setKeterangan(e.target.value)}
                        placeholder="Contoh: Keluar untuk pesanan customer"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                    />
                </div>

                {/* Preview harga */}
                {selectedBarang && totalHarga !== null && (
                    <div className="rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 space-y-1">
                        {isPotongan && (
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Harga / potong</span>
                                <span className="font-medium text-gray-700">{formatRupiah(hargaPerUnit)}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-gray-600">Total Harga</span>
                            <span className="font-bold text-blue-700">{formatRupiah(totalHarga)}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
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
                    disabled={isSubmitDisabled}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm disabled:opacity-60"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        'Simpan Barang Keluar'
                    )}
                </button>
            </div>
        </form>
    );
}
