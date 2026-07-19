'use client';

import { useState } from 'react';
import CompanyProfileForm from '@/app/components/form/crud/formCompanyProfile';
import ModalSukses from '@/app/components/modal/successModal';
import { Loader2 } from 'lucide-react';
import { useSeeAllCompanyQuery } from '@/hooks/api/companySliceAPI';

export default function CompanyProfilePage() {
    const { data: response, isLoading, isError } = useSeeAllCompanyQuery();
    const companyData = response?.data?.[0];

    const [showModalSukses, setShowModalSukses] = useState(false);

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Company Profile</h1>
                    <p className="text-gray-500 text-sm mt-1">Kelola informasi profil perusahaan</p>
                </div>
            </div>

            {/* State: loading */}
            {isLoading && (
                <div className="flex items-center justify-center gap-2 px-5 py-14 text-gray-400 text-sm bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memuat data perusahaan...
                </div>
            )}

            {/* State: error */}
            {!isLoading && isError && (
                <div className="px-5 py-14 text-center text-sm text-red-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    Gagal memuat data perusahaan. Coba muat ulang halaman.
                </div>
            )}

            {!isLoading && !isError && (
                <CompanyProfileForm
                    companyData={companyData}
                    onSuccess={() => setShowModalSukses(true)}
                />
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