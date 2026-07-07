'use client';

import { useState } from 'react';
import { ArrowDownCircle, Package, TrendingUp, Search, Plus } from 'lucide-react';
import StatCard from '@/app/components/card/statsCard';
import ModalTambah from '@/app/components/modal/modal-crud/modalTambah';
// import FormTambahBarangMasuk from '@/app/components/form/crud/create/formTambahBarangMasuk';

// Dummy data mengikuti struktur response API GET /api/mutasi-stok/masuk
const dummyMutasiMasuk = [
    {
        id: 'c7d0bed4-e658-40b4-9acc-6f35a77e011a',
        barangId: '5c1ad578-7dfe-4111-b1ba-6da29ce89ae0',
        userId: '951f9ed4-db95-4b80-b636-a7d51ba932e8',
        tipe: 'Masuk',
        jumlah: 50,
        stokSebelum: 90,
        stokSesudah: 140,
        keterangan: 'Pembelian dari CV Sumber Jaya',
        createdAt: '2026-07-04T12:15:33.487Z',
        barang: {
            id: '5c1ad578-7dfe-4111-b1ba-6da29ce89ae0',
            kategoriId: 'fecf8cf5-3e6f-447d-96e2-93b06be6d468',
            namaBarang: 'Tes update barang',
            kodeBarang: '',
            jumlahBarang: 140,
            status: 'Aktif',
            ukuran: '30 cm X 90 cm',
        },
        user: {
            id: '951f9ed4-db95-4b80-b636-a7d51ba932e8',
            username: 'User1',
            role: 'Admin_1',
        },
    },
    {
        id: 'a1b2c3d4-e5f6-4789-9abc-def012345678',
        barangId: '7e2bd689-8efc-4222-c2cb-7eb30dfa1bf1',
        userId: '951f9ed4-db95-4b80-b636-a7d51ba932e8',
        tipe: 'Masuk',
        jumlah: 25,
        stokSebelum: 10,
        stokSesudah: 35,
        keterangan: 'Restock rutin bulanan',
        createdAt: '2026-07-02T09:40:12.120Z',
        barang: {
            id: '7e2bd689-8efc-4222-c2cb-7eb30dfa1bf1',
            kategoriId: 'fecf8cf5-3e6f-447d-96e2-93b06be6d468',
            namaBarang: 'Karpet Lantai Vinyl',
            kodeBarang: 'KRP-002',
            jumlahBarang: 35,
            status: 'Aktif',
            ukuran: '2 m X 5 m',
        },
        user: {
            id: '951f9ed4-db95-4b80-b636-a7d51ba932e8',
            username: 'User1',
            role: 'Admin_1',
        },
    },
];

export default function DataBarangMasuk() {
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [keyword, setKeyword] = useState('');

    // TODO: ganti ke useSeeAllMutasiMasukQuery() kalau API sudah siap
    const mutasiList = dummyMutasiMasuk;
    const isLoading = false;
    const isError = false;

    const filtered = keyword.trim()
        ? mutasiList.filter((item) => item.barang?.namaBarang.toLowerCase().includes(keyword.toLowerCase()))
        : mutasiList;

    const totalTransaksi = mutasiList.length;
    const totalJumlahMasuk = mutasiList.reduce((sum, item) => sum + item.jumlah, 0);
    const totalBarangUnik = new Set(mutasiList.map((item) => item.barangId)).size;

    const formatTanggal = (dateStr) => {
        return new Date(dateStr).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
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
                <StatCard icon={ArrowDownCircle} label="Total Transaksi Masuk" value={totalTransaksi} tone="blue" />
                <StatCard icon={TrendingUp} label="Total Unit Masuk" value={totalJumlahMasuk} tone="green" />
                <StatCard icon={Package} label="Jenis Barang Terlibat" value={totalBarangUnik} tone="amber" />
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <ArrowDownCircle className="w-4 h-4 text-blue-600" />
                        <h2 className="font-bold text-gray-900 text-sm">Riwayat Barang Masuk</h2>
                    </div>

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
                    //formTambah={FormTambahBarangMasuk}
                    successTitle="Berhasil"
                    successMessage="Berhasil Menambahkan Barang Masuk"
                />
            )}
        </div>
    );
}