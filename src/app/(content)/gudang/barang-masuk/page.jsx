'use client';

import { useState } from 'react';
import { ArrowDownCircle, Package, TrendingUp, Search, Plus, CalendarDays, X } from 'lucide-react';
import StatCard from '@/app/components/card/statsCard';
import ModalTambah from '@/app/components/modal/modal-crud/modalTambah';
import { useSeeAllMutasiMasukQuery } from '@/hooks/api/mutasiSliceAPI';
import FormTambahBarangMasuk from '@/app/components/form/crud/create/formTambahMutasiMasuk';
import { formatTanggal } from '@/hooks/utils/formatTanggal';

export default function DataBarangMasuk() {
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { data: mutasi, isLoading, isError } = useSeeAllMutasiMasukQuery({ startDate, endDate });
    const mutasiList = mutasi?.data ?? [];

    const filtered = keyword.trim()
        ? mutasiList.filter((item) => item.barang?.namaBarang.toLowerCase().includes(keyword.toLowerCase()))
        : mutasiList;

    const totalJumlahMasuk = mutasiList.reduce((sum, item) => sum + item.jumlah, 0);
    const totalBarangUnik = new Set(mutasiList.map((item) => item.barangId)).size;

    const handleResetTanggal = () => {
        setStartDate('');
        setEndDate('');
    };

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Barang Masuk</h1>
                    <p className="text-gray-500 text-sm mt-1">Riwayat penambahan stok barang</p>
                </div>
                <button
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm"
                    onClick={() => setShowModalTambah(true)}
                >
                    <Plus className="w-4 h-4" />
                    Tambah Barang Masuk
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard icon={TrendingUp} label="Total Unit Masuk" value={totalJumlahMasuk} tone="green" />
                <StatCard icon={Package} label="Jenis Barang" value={totalBarangUnik} tone="amber" />
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <ArrowDownCircle className="w-4 h-4 text-blue-600" />
                        <h2 className="font-bold text-gray-900 text-sm">Riwayat Barang Masuk</h2>
                    </div>

                    <div className="flex items-end gap-2 flex-wrap">
                        {/* Filter tanggal */}
                        <div className="flex items-end gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5">
                            <div className="flex items-center gap-1.5">
                                <CalendarDays className="w-4 h-4 text-gray-400 mb-0.5" />
                                <div className="flex flex-col">
                                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                                        Tanggal Awal
                                    </label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        max={endDate || undefined}
                                        className="text-sm bg-transparent focus:outline-none text-gray-600"
                                    />
                                </div>
                            </div>

                            <span className="text-gray-300 mb-1.5">–</span>

                            <div className="flex flex-col">
                                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                                    Tanggal Akhir
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || undefined}
                                    className="text-sm bg-transparent focus:outline-none text-gray-600"
                                />
                            </div>

                            {(startDate || endDate) && (
                                <button
                                    onClick={handleResetTanggal}
                                    title="Reset filter tanggal"
                                    className="text-gray-400 hover:text-red-500 transition-colors mb-1.5"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Search nama barang */}
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Cari nama barang..."
                                className="pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-56"
                            />
                        </div>
                    </div>
                </div>

                {/* State: loading */}
                {isLoading && (
                    <div className="flex items-center justify-center gap-2 px-5 py-14 text-gray-400 text-sm">
                        Memuat data barang masuk...
                    </div>
                )}

                {/* State: error */}
                {!isLoading && isError && (
                    <div className="px-5 py-14 text-center text-sm text-red-500">
                        Gagal memuat data barang masuk. Coba muat ulang halaman.
                    </div>
                )}

                {/* State: sukses */}
                {!isLoading && !isError && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                                    <th className="px-5 py-3 font-semibold w-16">No</th>
                                    <th className="px-5 py-3 font-semibold">Nama Barang</th>
                                    <th className="px-5 py-3 font-semibold">Kode Barang</th>
                                    <th className="px-5 py-3 font-semibold">Ukuran Barang</th>
                                    <th className="px-5 py-3 font-semibold">Jumlah Masuk</th>
                                    <th className="px-5 py-3 font-semibold">Stok Sebelum</th>
                                    <th className="px-5 py-3 font-semibold">Stok Sesudah</th>
                                    <th className="px-5 py-3 font-semibold">Keterangan</th>
                                    <th className="px-5 py-3 font-semibold">Oleh</th>
                                    <th className="px-5 py-3 font-semibold">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((item, idx) => (
                                    <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3 text-gray-400">{idx + 1}</td>
                                        <td className="px-5 py-3 font-medium text-gray-900">
                                            {item.barang?.namaBarang ?? '-'}
                                        </td>
                                        <td className="px-5 py-3 text-gray-500">{item.barang?.kodeBarang || '-'}</td>
                                        <td className="px-5 py-3 text-gray-500">{item.barang?.ukuran ?? '-'}</td>
                                        <td className="px-5 py-3">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-green-50 text-green-700 font-semibold text-xs">
                                                +{item.jumlah}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-gray-500">{item.stokSebelum}</td>
                                        <td className="px-5 py-3 font-medium text-gray-900">{item.stokSesudah}</td>
                                        <td className="px-5 py-3 text-gray-500">{item.keterangan || '-'}</td>
                                        <td className="px-5 py-3 text-gray-500">{item.user?.username ?? '-'}</td>
                                        <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                                            {formatTanggal(item.createdAt)}
                                        </td>
                                    </tr>
                                ))}

                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="px-5 py-10 text-center text-gray-400 text-sm">
                                            Data barang masuk tidak ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModalTambah && (
                <ModalTambah
                    onClose={() => setShowModalTambah(false)}
                    formTambah={FormTambahBarangMasuk}
                    title="Tambah Barang Masuk"
                    successTitle="Berhasil"
                    successMessage="Berhasil Menambahkan Barang Masuk"
                />
            )}
        </div>
    );
}