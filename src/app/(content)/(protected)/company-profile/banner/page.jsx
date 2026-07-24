'use client';

import { useState } from 'react';
import ModalSukses from '@/app/components/modal/successModal';
import { Loader2 } from 'lucide-react';
import { useSeeAllBannerQuery } from '@/hooks/api/companySliceAPI';
import BannerForm from '@/app/components/form/crud/formBanner';

export default function bannerPage() {
    const { data: responseBanner, isLoading, isError } = useSeeAllBannerQuery();
    const bannerData = responseBanner?.data || [];

    const [showModalSukses, setShowModalSukses] = useState(false);

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Banner Hero</h1>
                    <p className="text-gray-500 text-sm mt-1">Kelola Banner profil perusahaan</p>
                </div>
            </div>

            {/* State: loading */}
            {isLoading && (
                <div className="flex items-center justify-center gap-2 px-5 py-14 text-gray-400 text-sm bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memuat data banner...
                </div>
            )}

            {/* State: error */}
            {!isLoading && isError && (
                <div className="px-5 py-14 text-center text-sm text-red-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    Gagal memuat data banner. Coba muat ulang halaman.
                </div>
            )}

            {!isLoading && !isError && (
                <BannerForm bannerData={bannerData} onSuccess={() => setShowModalSukses(true)} />
            )}
            {showModalSukses && (
                <ModalSukses
                    onClose={() => setShowModalSukses(false)}
                    title="Berhasil"
                    message="Data perusahaan berhasil disimpan."
                />
            )}
        </div>
    );
}
