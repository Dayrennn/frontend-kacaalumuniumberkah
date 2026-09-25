"use client";

import { useEffect, useState } from "react";
import { Building2, HardHat, PlayCircle, X } from "lucide-react";
import ProjectCard from "../../card/projectCard";
import { useSeeAllProjectQuery } from "@/hooks/api/projectSliceAPI";
import { createPortal } from "react-dom";

export default function Proyek() {
    const [active, setActive] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    const { data: response } = useSeeAllProjectQuery();
    const projects = response?.data || [];

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">
                    <div>
                        <div className="section-tag"></div>
                        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">Pengerjaan Langsung</p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-snug">Bukan Cuma Jual Bahan, Kami Kerjakan Proyeknya</h2>
                        <p className="text-gray-500 leading-relaxed">
                            Fokus utama kami ada di pengerjaan proyek, bukan sekadar toko bahan bangunan. Tim pemasangan kami turun langsung ke lokasi, dari pemasangan rangka
                            hollow, plafon gypsum dan PVC, sampai finishing. Setiap tahap kami dokumentasikan lewat foto dan video supaya kamu tahu persis bagaimana proyekmu
                            dikerjakan.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                                <HardHat className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">Tim Pemasangan Sendiri</h4>
                            <p className="text-gray-500 text-sm">Tenaga kerja berpengalaman, bukan subkontraktor lepas.</p>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                <Building2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">Skala Proyek Fleksibel</h4>
                            <p className="text-gray-500 text-sm">Dari renovasi rumah sampai gedung komersial.</p>
                        </div>
                    </div>
                </div>

                {/* Gallery Grid */}
                <ProjectCard
                    projects={projects}
                    setActive={setActive}
                    videoUrl={projects.videoUrl}
                    thumbnailUrl={projects.thumbnailUrl}
                    title={projects.title}
                    deskripsi={projects.deskripsi}
                />
            </div>

            {/* Lightbox / detail viewer */}
            {mounted &&
                active &&
                createPortal(
                    <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4" onClick={() => setActive(null)}>
                        <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
                            <div className="relative bg-black">
                                {active.videoUrl ? (
                                    <video src={active.videoUrl} controls autoPlay className="w-full max-h-[70vh]" />
                                ) : (
                                    <img src={active.thumbnailUrl} alt={active.title} className="w-full max-h-[70vh] object-contain" />
                                )}
                                <button
                                    onClick={() => setActive(null)}
                                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white"
                                    aria-label="Tutup"
                                >
                                    <X className="w-5 h-5 text-gray-900" />
                                </button>
                            </div>
                            <div className="p-5">
                                <h4 className="font-bold text-gray-900 mb-1">{active.title}</h4>
                                <p className="text-gray-500 text-sm mb-2">{active.location}</p>
                                <p className="text-gray-600 text-sm leading-relaxed">{active.deskripsi}</p>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    );
}
