'use client';

import StatusBadge from '@/app/components/badge/statusBadge';
import { Loader2, Package, Pencil, Plus, Search, ShieldAlert, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { useSeeAllUserQuery } from '@/hooks/api/userSliceAPI';
import { useSelector } from 'react-redux';
import { selectUser } from '@/hooks/api/authSliceAPI';
import ModalTambah from '@/app/components/modal/modal-crud/modalTambah';
import ModalEdit from '@/app/components/modal/modal-crud/modalEdit';
import ModalHapus from '@/app/components/modal/modal-crud/modalHapus';
import FormTambahUser from '@/app/components/form/crud/create/formTambahUser';
import FormEditUser from '@/app/components/form/crud/update/formEditUser';
import TableSkeleton from '@/app/components/skeleton/tableSkeleton';
import FormHapusUser from '@/app/components/form/crud/delete/formHapusUser';
import ForbiddenModal from '@/app/components/modal/forbiddenModal';
import { useRouter } from 'next/navigation';

export default function DataPengguna() {
    const router = useRouter();
    const user = useSelector(selectUser);
    const isOwner = user?.role === 'Owner';

    const { data, isLoading, isError } = useSeeAllUserQuery(undefined, {
        skip: !isOwner,
    });
    const userList = data?.data ?? [];
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalHapus, setShowModalHapus] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModalEdit(true);
    };

    const [removeUser, setRemoveUser] = useState(null);
    const handleRemove = (user) => {
        setRemoveUser(user);
        setShowModalHapus(true);
    };

    if (isLoading) {
        return <TableSkeleton statCount={3} columns={9} />;
    }

    if (!isOwner) {
        return <ForbiddenModal onBack={() => router.back()} />;
    }
    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Data Pengguna</h1>
                    <p className="text-gray-500 text-sm mt-1">Kelola data pengguna</p>
                </div>
                <button
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm"
                    onClick={() => setShowModalTambah(true)}
                >
                    <Plus className="w-4 h-4" />
                    Tambah Pengguna
                </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <h2 className="font-bold text-gray-900 text-sm">Daftar Pengguna</h2>
                    </div>
                </div>

                {/* State: loading */}
                {isLoading && (
                    <div className="flex items-center justify-center gap-2 px-5 py-14 text-gray-400 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Memuat data penggna...
                    </div>
                )}

                {/* State: error */}
                {!isLoading && isError && (
                    <div className="px-5 py-14 text-center text-sm text-red-500">
                        Gagal memuat data pengguna. Coba muat ulang halaman.
                    </div>
                )}

                {/* State: sukses */}
                {!isLoading && !isError && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                                    <th className="px-5 py-3 font-semibold w-16">No</th>
                                    <th className="px-5 py-3 font-semibold">Nama User</th>
                                    <th className="px-5 py-3 font-semibold">Role</th>
                                    <th className="px-5 py-3 font-semibold text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {userList.map((item, idx) => (
                                    <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3 text-gray-400">{idx + 1}</td>
                                        <td className="px-5 py-3 font-medium text-gray-900">{item.username}</td>
                                        <td className="px-5 py-3 text-gray-500">{item.role || '-'}</td>
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
                                                {/* <button
                                                    onClick={() => handleRemove(item)}
                                                    title="Hapus barang"
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {userList.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-5 py-10 text-center text-gray-400 text-sm">
                                            Pengguna tidak ditemukan.
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
                    formTambah={FormTambahUser}
                    title="Tambah Data Pengguna"
                    successTitle="Berhasil"
                    successMessage="Berhasil Tambah Pengguna"
                />
            )}
            {showModalEdit && (
                <ModalEdit
                    onClose={() => setShowModalEdit(false)}
                    formEdit={FormEditUser}
                    initialData={selectedUser}
                    title="Edit Data User"
                    successTitle="Berhasil"
                    successMessage="Data Berhasil Dirubah"
                />
            )}
            {showModalHapus && (
                <ModalHapus
                    onClose={() => setShowModalHapus(false)}
                    formHapus={FormHapusUser}
                    title="Hapus Data User"
                    successTitle="Berhasil"
                    successMessage="Berhasil Menghapus Data"
                    initialData={removeUser}
                />
            )}
        </div>
    );
}
