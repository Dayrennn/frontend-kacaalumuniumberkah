"use client";
import CardProduct from "@/app/components/card/cardProduct";
import ProjectCard from "@/app/components/card/projectCard";
import FormTambahProject from "@/app/components/form/crud/create/formTambahProject";
import ModalTambah from "@/app/components/modal/modal-crud/modalTambah";
import ProjectModal from "@/app/components/modal/projectModal";
import { useCreateProjectMutation, useSeeAllProjectQuery } from "@/hooks/api/projectSliceAPI";
import { Boxes, Plus } from "lucide-react";
import { useState } from "react";

export default function DataProject() {
    const [active, setActive] = useState(null);

    const [showModalTambah, setShowModalTambah] = useState(false);
    const { data, isLoading, isError } = useSeeAllProjectQuery();
    const project = data?.data ?? [];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Company Profile Project</h1>
                    <p className="text-gray-500 text-sm mt-1">Kelola Project yang ditampilkan di company profile</p>
                </div>
                <button
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm"
                    onClick={() => setShowModalTambah(true)}
                >
                    <Plus className="w-4 h-4" />
                    Tambah Produk
                </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-blue-600" />
                    <h2 className="font-bold text-gray-900 text-sm">Daftar Project</h2>
                </div>
                {!isLoading && isError && <div className="px-5 py-14 text-center text-sm text-red-500">Gagal memuat data produk. Coba muat ulang halaman.</div>}

                {!isLoading && !isError && (
                    <div className="p-5">
                        {project.length > 0 ? (
                            <ProjectCard projects={project} setActive={setActive} />
                        ) : (
                            <div className="px-5 py-14 text-center text-gray-400 text-sm">Produk tidak ditemukan.</div>
                        )}
                    </div>
                )}
            </div>
            {active && (
                <ProjectModal
                    active={active}
                    setActive={setActive}
                />
            )}
            {showModalTambah && (
                <ModalTambah
                    onClose={() => setShowModalTambah(false)}
                    formTambah={FormTambahProject}
                    successTitle="Berhasil"
                    successMessage="Berhasil Tambah Iklan"
                    title="Tambah Data Iklan"
                />
            )}
        </div>
    );
}
