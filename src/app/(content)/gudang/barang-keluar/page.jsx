'use client';

import { useState, useEffect } from 'react';
import {
    ArrowDownCircle,
    Package,
    Search,
    Plus,
    TrendingDown,
    X,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Printer,
} from 'lucide-react';
import StatCard from '@/app/components/card/statsCard';
import ModalTambah from '@/app/components/modal/modal-crud/modalTambah';
import { useSeeAllMutasiKeluarQuery } from '@/hooks/api/mutasiSliceAPI';
import { useLazyPrintLaporanKeluarQuery } from '@/hooks/api/laporanSliceAPI';
import { formatTanggal } from '@/hooks/utils/formatTanggal';
import FormTambahBarangKeluar from '@/app/components/form/crud/create/formTambahMutasiKeluar';

export default function DataBarangKeluar() {
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const {
        data: mutasi,
        isLoading,
        isError,
    } = useSeeAllMutasiKeluarQuery({
        startDate,
        endDate,
        page,
        limit,
    });
    const [triggerCetakPDF, { isFetching: isLoadingPDF }] = useLazyPrintLaporanKeluarQuery();

    const mutasiList = mutasi?.data?.data ?? [];
    const meta = mutasi?.data?.meta ?? { total: 0, page: 1, limit, totalPages: 1 };

    // Catatan: search keyword di sini masih filter di data 1 halaman saja (client-side).
    // Kalau mau search across semua data, sebaiknya keyword juga dikirim ke backend (server-side search).
    const filtered = keyword.trim()
        ? mutasiList.filter((item) => item.barang?.namaBarang.toLowerCase().includes(keyword.toLowerCase()))
        : mutasiList;

    const totalJumlahBarangKeluar = mutasiList.reduce((sum, item) => sum + item.jumlah, 0);
    const totalBarangUnik = new Set(mutasiList.map((item) => item.barangId)).size;

    const handleResetTanggal = () => {
        setStartDate('');
        setEndDate('');
    };

    const handlePrevPage = () => {
        setPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setPage((prev) => Math.min(meta.totalPages, prev + 1));
    };

    const getPageNumbers = () => {
        const total = meta.totalPages;
        const current = meta.page;
        const delta = 1;
        const pages = [];

        for (let i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }
        return pages;
    };

    const handleCetakPDF = async () => {
        try {
            const blob = await triggerCetakPDF({ startDate, endDate }).unwrap();
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
            setTimeout(() => window.URL.revokeObjectURL(url), 10000);
        } catch (err) {
            console.error('Gagal cetak PDF:', err);
        }
    };

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Barang Keluar</h1>
                    <p className="text-gray-500 text-sm mt-1">Riwayat pengeluaran stok barang</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 transition-colors text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm"
                        onClick={handleCetakPDF}
                    >
                        <Printer className="w-4 h-4" />
                        Cetak Laporan PDF
                    </button>
                    <button
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm"
                        onClick={() => setShowModalTambah(true)}
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Barang Keluar
                    </button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                    icon={TrendingDown}
                    label="Total Unit Keluar (Halaman Ini)"
                    value={totalJumlahBarangKeluar}
                    tone="red"
                />
                <StatCard icon={Package} label="Jenis Barang (Halaman Ini)" value={totalBarangUnik} tone="amber" />
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <ArrowDownCircle className="w-4 h-4 text-blue-600" />
                        <h2 className="font-bold text-gray-900 text-sm">Riwayat Barang Keluar</h2>
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
                        Memuat data barang keluar...
                    </div>
                )}

                {/* State: error */}
                {!isLoading && isError && (
                    <div className="px-5 py-14 text-center text-sm text-red-500">
                        Gagal memuat data barang keluar. Coba muat ulang halaman.
                    </div>
                )}

                {/* State: sukses */}
                {!isLoading && !isError && (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                                        <th className="px-5 py-3 font-semibold w-16">No</th>
                                        <th className="px-5 py-3 font-semibold">Nama Barang</th>
                                        <th className="px-5 py-3 font-semibold">Nama Customer</th>
                                        <th className="px-5 py-3 font-semibold">Kode Barang</th>
                                        <th className="px-5 py-3 font-semibold">Ukuran Barang</th>
                                        <th className="px-5 py-3 font-semibold">Jumlah Keluar</th>
                                        <th className="px-5 py-3 font-semibold">Stok Sebelum</th>
                                        <th className="px-5 py-3 font-semibold">Stok Sesudah</th>
                                        <th className="px-5 py-3 font-semibold">Jenis Penjualan</th>
                                        <th className="px-5 py-3 font-semibold">Total Harga</th>
                                        <th className="px-5 py-3 font-semibold">Keterangan</th>
                                        <th className="px-5 py-3 font-semibold">Oleh</th>
                                        <th className="px-5 py-3 font-semibold">Tanggal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filtered.map((item, idx) => (
                                        <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                                            <td className="px-5 py-3 text-gray-400">
                                                {(meta.page - 1) * meta.limit + idx + 1}
                                            </td>
                                            <td className="px-5 py-3 font-medium text-gray-900">
                                                {item.barang?.namaBarang ?? '-'}
                                            </td>
                                            <td className="px-5 py-3 font-medium text-gray-900">
                                                {item?.customer ?? '-'}
                                            </td>
                                            <td className="px-5 py-3 text-gray-500">
                                                {item.barang?.kodeBarang || '-'}
                                            </td>
                                            <td className="px-5 py-3 text-gray-500">{item.barang?.ukuran || '-'}</td>
                                            <td className="px-5 py-3">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-red-50 text-red-700 font-semibold text-xs">
                                                    -{item.jumlah}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-gray-500">{item.stokSebelum}</td>
                                            <td className="px-5 py-3 font-medium text-gray-900">{item.stokSesudah}</td>
                                            <td className="px-5 py-3 font-medium text-gray-900">{item.barang?.jenisPenjualan}</td>
                                            <td className="px-5 py-3 text-gray-500">{item.totalHarga || '-'}</td>
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
                                                Data barang keluar tidak ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {meta.totalPages > 0 && (
                            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 flex-wrap gap-3">
                                <p className="text-xs text-gray-400">
                                    Menampilkan{' '}
                                    <span className="font-semibold text-gray-600">
                                        {meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1}
                                    </span>
                                    {' - '}
                                    <span className="font-semibold text-gray-600">
                                        {Math.min(meta.page * meta.limit, meta.total)}
                                    </span>
                                    {' dari '}
                                    <span className="font-semibold text-gray-600">{meta.total}</span> data
                                </p>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={meta.page <= 1}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>

                                    {getPageNumbers().map((p, idx) =>
                                        p === '...' ? (
                                            <span
                                                key={`dots-${idx}`}
                                                className="w-8 h-8 flex items-center justify-center text-gray-300 text-sm"
                                            >
                                                ...
                                            </span>
                                        ) : (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p)}
                                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                                                    p === meta.page
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-500 hover:bg-gray-50 border border-gray-200'
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        ),
                                    )}

                                    <button
                                        onClick={handleNextPage}
                                        disabled={meta.page >= meta.totalPages}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {showModalTambah && (
                <ModalTambah
                    onClose={() => setShowModalTambah(false)}
                    formTambah={FormTambahBarangKeluar}
                    title="Tambah Barang Keluar"
                    successTitle="Berhasil"
                    successMessage="Berhasil Menambahkan Barang Keluar"
                />
            )}
        </div>
    );
}
