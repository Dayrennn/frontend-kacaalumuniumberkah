'use client';

import { useState } from 'react';
import { Tags, CheckCircle2, XCircle, Search, Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useSeeAllKategoriQuery } from '@/hooks/api/kategoriSliceAPI';
import StatCard from '@/app/components/card/statsCard';
import StatusBadge from '@/app/components/badge/statusBadge';
import ModalTambah from '@/app/components/modal/modal-crud/modalTambah';
import FormTambahKategori from '@/app/components/form/crud/create/formTambahKategori';
import ModalEdit from '@/app/components/modal/modal-crud/modalEdit';
import FormEditKategori from '@/app/components/form/crud/update/formEditKategori';
import ModalHapus from '@/app/components/modal/modal-crud/modalHapus';
import FormHapusKategori from '@/app/components/form/crud/delete/formHapusKategori';
import TableSkeleton from '@/app/components/skeleton/tableSkeleton';

import { selectUser } from '@/hooks/api/authSliceAPI';
import { useSelector } from 'react-redux';

export default function DataKategori() {
    const user = useSelector(selectUser);
    const isOwner = user?.role === 'Owner';
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalHapus, setShowModalHapus] = useState(false);

    const { data: response, isLoading, isError } = useSeeAllKategoriQuery();
    const kategoriList = response?.data?.kategori ?? [];

    const [keyword, setKeyword] = useState('');

    const filtered = keyword.trim()
        ? kategoriList.filter((item) => item.namaKategori.toLowerCase().includes(keyword.toLowerCase()))
        : kategoriList;

    const summary = response?.data?.summary ?? { totalKategori: 0, totalKategoriAktif: 0, totalKategoriNonaktif: 0 };

    const [selectedKategori, setSelectedKategori] = useState(null);
    const handleEdit = (kategori) => {
        setSelectedKategori(kategori);
        setShowModalEdit(true);
    };

    const [removeKategori, setRemoveKategori] = useState(null);
    const handleRemove = (kategori) => {
        setRemoveKategori(kategori);
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
                    <h1 className="text-2xl font-extrabold text-gray-900">Data Kategori</h1>
                    <p className="text-gray-500 text-sm mt-1">Kelola kategori barang gudang</p>
                </div>
                <button
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm"
                    onClick={() => setShowModalTambah(true)}
                >
                    <Plus className="w-4 h-4" />
                    Tambah Kategori
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard icon={Tags} label="Total Kategori" value={summary.totalKategori} tone="blue" />
                <StatCard icon={CheckCircle2} label="Kategori Aktif" value={summary.totalKategoriAktif} tone="green" />
                <StatCard icon={XCircle} label="Kategori Nonaktif" value={summary.totalKategoriNonaktif} tone="amber" />
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <Tags className="w-4 h-4 text-blue-600" />
                        <h2 className="font-bold text-gray-900 text-sm">Daftar Kategori</h2>
                    </div>

                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Cari nama kategori..."
                            className="pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-56"
                        />
                    </div>
                </div>

                {/* State: loading */}
                {isLoading && (
                    <div className="flex items-center justify-center gap-2 px-5 py-14 text-gray-400 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Memuat data kategori...
                    </div>
                )}

                {/* State: error */}
                {!isLoading && isError && (
                    <div className="px-5 py-14 text-center text-sm text-red-500">
                        Gagal memuat data kategori. Coba muat ulang halaman.
                    </div>
                )}

                {/* State: sukses */}
                {!isLoading && !isError && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                                    <th className="px-5 py-3 font-semibold w-16">No</th>
                                    <th className="px-5 py-3 font-semibold">Nama Kategori</th>
                                    <th className="px-5 py-3 font-semibold">Status</th>
                                    <th className="px-5 py-3 font-semibold text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((item, idx) => (
                                    <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3 text-gray-400">{idx + 1}</td>
                                        <td className="px-5 py-3 font-medium text-gray-900">{item.namaKategori}</td>
                                        <td className="px-5 py-3">
                                            <StatusBadge status={item.status} />
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    title="Edit kategori"
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                {isOwner && (
                                                    <button
                                                        onClick={() => handleRemove(item)}
                                                        title="Hapus kategori"
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
                                        <td colSpan={4} className="px-5 py-10 text-center text-gray-400 text-sm">
                                            Kategori tidak ditemukan.
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
                    formTambah={FormTambahKategori}
                    title="Tambah Kategori"
                    successTitle="Berhasil"
                    successMessage="Berhasil Tambah Kategori"
                />
            )}
            {showModalEdit && (
                <ModalEdit
                    onClose={() => setShowModalEdit(false)}
                    formEdit={FormEditKategori}
                    initialData={selectedKategori}
                    title="Edit Kategori"
                    successTitle="Berhasil"
                    successMessage="Data Berhasil Dirubah"
                />
            )}
            {showModalHapus && (
                <ModalHapus
                    onClose={() => setShowModalHapus(false)}
                    formHapus={FormHapusKategori}
                    title="Hapus Kategori"
                    successTitle="Berhasil"
                    successMessage="Berhasil Menghapus Data"
                    initialData={removeKategori}
                />
            )}
        </div>
    );
}
