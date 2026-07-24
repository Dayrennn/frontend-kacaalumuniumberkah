'use client';

import { useState } from 'react';
import { Package, CheckCircle2, XCircle, Search, Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import StatCard from '@/app/components/card/statsCard';
import StatusBadge from '@/app/components/badge/statusBadge';
import ModalTambah from '@/app/components/modal/modal-crud/modalTambah';
import FormTambahBarang from '@/app/components/form/crud/create/formTambahBarang';
import { useSeeAllBarangQuery } from '@/hooks/api/barangSliceAPI';
import ModalEdit from '@/app/components/modal/modal-crud/modalEdit';
import FormEditBarang from '@/app/components/form/crud/update/formEditBarang';
import ModalHapus from '@/app/components/modal/modal-crud/modalHapus';
import FormHapusBarang from '@/app/components/form/crud/delete/formHapusBarang';
import TableSkeleton from '@/app/components/skeleton/tableSkeleton';

import { useSelector } from 'react-redux';
import { selectUser } from '@/hooks/api/authSliceAPI';

export default function DataBarang() {
    const user = useSelector(selectUser);
    const isOwner = user?.role === 'Owner';
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalHapus, setShowModalHapus] = useState(false);

    const { data: response, isLoading, isError } = useSeeAllBarangQuery();
    const barangList = response?.data?.barang ?? [];

    const [keyword, setKeyword] = useState('');

    const filtered = keyword.trim()
        ? barangList.filter((item) => item.namaBarang.toLowerCase().includes(keyword.toLowerCase()))
        : barangList;

    const summary = response?.data?.summary ?? { totalBarang: 0, barangAktif: 0, barangNonaktif: 0 };

    const [selectedBarang, setSelectedBarang] = useState(null);
    const handleEdit = (barang) => {
        setSelectedBarang(barang);
        setShowModalEdit(true);
    };

    const [removeBarang, setRemoveBarang] = useState(null);
    const handleRemove = (barang) => {
        setRemoveBarang(barang);
        setShowModalHapus(true);
    };

    if (isLoading) {
        return <TableSkeleton statCount={3} columns={9} />;
    }

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Data Barang</h1>
                    <p className="text-gray-500 text-sm mt-1">Kelola data barang gudang</p>
                </div>
                <button
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm"
                    onClick={() => setShowModalTambah(true)}
                >
                    <Plus className="w-4 h-4" />
                    Tambah Barang
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard icon={Package} label="Total Barang" value={summary.totalBarang} tone="blue" />
                <StatCard icon={CheckCircle2} label="Barang Aktif" value={summary.barangAktif} tone="green" />
                <StatCard icon={XCircle} label="Barang Nonaktif" value={summary.barangNonaktif} tone="amber" />
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-blue-600" />
                        <h2 className="font-bold text-gray-900 text-sm">Daftar Barang</h2>
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
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Memuat data barang...
                    </div>
                )}

                {/* State: error */}
                {!isLoading && isError && (
                    <div className="px-5 py-14 text-center text-sm text-red-500">
                        Gagal memuat data barang. Coba muat ulang halaman.
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
                                    <th className="px-5 py-3 font-semibold">Kategori</th>
                                    <th className="px-5 py-3 font-semibold">Ukuran</th>
                                    <th className="px-5 py-3 font-semibold">Jumlah</th>
                                    <th className="px-5 py-3 font-semibold">Harga</th>
                                    <th className="px-5 py-3 font-semibold">Jenis Penjualan</th>
                                    <th className="px-5 py-3 font-semibold">Status</th>
                                    <th className="px-5 py-3 font-semibold text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((item, idx) => (
                                    <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3 text-gray-400">{idx + 1}</td>
                                        <td className="px-5 py-3 font-medium text-gray-900">{item.namaBarang}</td>
                                        <td className="px-5 py-3 text-gray-500">{item.kodeBarang || '-'}</td>
                                        <td className="px-5 py-3 text-gray-500">
                                            {item.kategori?.namaKategori ?? '-'}
                                        </td>
                                        <td className="px-5 py-3 text-gray-500">{item.ukuran || '-'}</td>
                                        <td className="px-5 py-3 text-gray-500">{item.jumlahBarang}</td>
                                        <td className="px-5 py-3 text-gray-500">{item.harga || 0}</td>
                                        <td className="px-5 py-3 text-gray-500">{item.jenisPenjualan || '-'}</td>
                                        <td className="px-5 py-3">
                                            <StatusBadge status={item.status} />
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    title="Edit barang"
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                {isOwner && (
                                                    <button
                                                        onClick={() => handleRemove(item)}
                                                        title="Hapus barang"
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-5 py-10 text-center text-gray-400 text-sm">
                                            Barang tidak ditemukan.
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
                    formTambah={FormTambahBarang}
                    title="Tambah Data Barang"
                    successTitle="Berhasil"
                    successMessage="Berhasil Tambah Barang"
                />
            )}
            {showModalEdit && (
                <ModalEdit
                    onClose={() => setShowModalEdit(false)}
                    formEdit={FormEditBarang}
                    initialData={selectedBarang}
                    title="Edot Data Barang"
                    successTitle="Berhasil"
                    successMessage="Data Berhasil Dirubah"
                />
            )}
            {showModalHapus && (
                <ModalHapus
                    onClose={() => setShowModalHapus(false)}
                    formHapus={FormHapusBarang}
                    title="Hapus Data Barang"
                    successTitle="Berhasil"
                    successMessage="Berhasil Menghapus Data"
                    initialData={removeBarang}
                />
            )}
        </div>
    );
}
