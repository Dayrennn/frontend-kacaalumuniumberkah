'use client';

import { useState } from 'react';
import { Package, Search, Plus, Boxes, Tag } from 'lucide-react';
import StatCard from '@/app/components/card/statsCard';
import ModalTambah from '@/app/components/modal/modal-crud/modalTambah';
import FormTambahIklan from '@/app/components/form/crud/create/formTambahAds';
import AdsCard from '@/app/components/card/adsCard';
import { useSeeAllProdukAdsQuery, useRemoveProdukAdsMutation } from '@/hooks/api/produkAdsSliceAPI';
import ModalEdit from '@/app/components/modal/modal-crud/modalEdit';
import FormEditAds from '@/app/components/form/crud/update/formEditAds';
import ModalKonfirmasiHapus from '@/app/components/modal/modal-crud/modalKonfirmasiHapus';

export default function DataProduk() {
    const [keyword, setKeyword] = useState('');
    const [kategoriFilter, setKategoriFilter] = useState('Semua');
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalHapus, setShowModalHapus] = useState(false);

    const [deleteAds] = useRemoveProdukAdsMutation();

    const { data: ads, isLoading, isError } = useSeeAllProdukAdsQuery();
    const produkList = ads?.data || [];

    const daftarKategori = [
        'Semua',
        ...new Set(
            produkList.map((item) => item.barang?.kategori?.namaKategori).filter(Boolean), // buang undefined/null biar tidak jadi opsi kosong
        ),
    ];

    const filtered = produkList.filter((item) => {
        const namaBarang = item.barang?.namaBarang || '';
        const cocokKeyword = keyword.trim() ? namaBarang.toLowerCase().includes(keyword.toLowerCase()) : true;
        const cocokKategori =
            kategoriFilter === 'Semua' ? true : item.barang?.kategori?.namaKategori === kategoriFilter;
        return cocokKeyword && cocokKategori;
    });

    const totalProduk = produkList.length;
    const totalKategori = new Set(produkList.map((item) => item.barang?.kategori?.namaKategori)).size;

    const [selectedBarang, setSelectedBarang] = useState(null);
    const handleEdit = (item) => {
        setShowModalEdit(true);
        setSelectedBarang(item);
    };

    const [deleteBarang, setDeleteBarang] = useState(null);
    const handleDelete = (item) => {
        setDeleteBarang(item);
        setShowModalHapus(true);
    };

    const handleConfirm = async (id) => {
        await deleteAds(id).unwrap();
    };

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Company Profile Produk</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Kelola katalog produk yang ditampilkan di company profile
                    </p>
                </div>
                <button
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm"
                    onClick={() => setShowModalTambah(true)}
                >
                    <Plus className="w-4 h-4" />
                    Tambah Produk
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard icon={Package} label="Total Produk" value={totalProduk} tone="blue" />
                <StatCard icon={Tag} label="Jenis Kategori" value={totalKategori} tone="amber" />
            </div>

            {/* Konten */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <Boxes className="w-4 h-4 text-blue-600" />
                        <h2 className="font-bold text-gray-900 text-sm">Daftar Produk</h2>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <select
                            value={kategoriFilter}
                            onChange={(e) => setKategoriFilter(e.target.value)}
                            className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        >
                            {daftarKategori.map((kat) => (
                                <option key={kat} value={kat}>
                                    {kat}
                                </option>
                            ))}
                        </select>

                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Cari nama produk..."
                                className="pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-56"
                            />
                        </div>
                    </div>
                </div>

                {isLoading && (
                    <div className="flex items-center justify-center gap-2 px-5 py-14 text-gray-400 text-sm">
                        Memuat data produk...
                    </div>
                )}

                {!isLoading && isError && (
                    <div className="px-5 py-14 text-center text-sm text-red-500">
                        Gagal memuat data produk. Coba muat ulang halaman.
                    </div>
                )}

                {!isLoading && !isError && (
                    <div className="p-5">
                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {filtered.map((item) => (
                                    <AdsCard
                                        key={item.id}
                                        item={item}
                                        onEdit={handleEdit}
                                        onDelete={() => handleDelete(item)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="px-5 py-14 text-center text-gray-400 text-sm">Produk tidak ditemukan.</div>
                        )}
                    </div>
                )}
            </div>

            {showModalTambah && (
                <ModalTambah
                    onClose={() => setShowModalTambah(false)}
                    formTambah={FormTambahIklan}
                    successTitle="Berhasil"
                    successMessage="Berhasil Tambah Iklan"
                    title="Tambah Data Iklan"
                />
            )}
            {showModalEdit && (
                <ModalEdit
                    onClose={() => setShowModalEdit(false)}
                    formEdit={FormEditAds}
                    initialData={selectedBarang}
                    successTitle="Berhasil"
                    successMessage="Berhasil Update Iklan"
                    title="Update Iklan"
                />
            )}
            {showModalHapus && (
                <ModalKonfirmasiHapus
                    onClose={() => setShowModalHapus(false)}
                    onConfirm={handleConfirm}
                    successTitle="Berhasil"
                    successMessage="Berhasil Hapus Iklan"
                    title="Hapus Iklan"
                    initialData={deleteBarang}
                    message={`Apakah kamu yakin ingin menghapus "${deleteBarang?.barang?.namaBarang}"?`}
                />
            )}
        </div>
    );
}
