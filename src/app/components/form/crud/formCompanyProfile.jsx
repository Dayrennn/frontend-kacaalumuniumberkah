import { useState } from 'react';
import { Building2, Save, Loader2, Phone, MapPin, Clock, Mail, FileText } from 'lucide-react';
import { useCreateCompanyMutation } from '@/hooks/api/companySliceAPI';

export default function CompanyProfileForm({ companyData, onSuccess }) {
    const [updateCompany, { isLoading: isSaving }] = useCreateCompanyMutation();

    // Lazy initial state: fungsi ini cuma jalan sekali saat komponen pertama mount,
    // dan pada titik ini companyData sudah pasti final (bukan `undefined` yang nanti berubah)
    const [formData, setFormData] = useState(() => ({
        namaPerusahaan: companyData?.namaPerusahaan || '',
        telephone: companyData?.telephone || '',
        deskripsiPerusahaan: companyData?.deskripsiPerusahaan || '',
        lokasi: companyData?.lokasi || '',
        jadwal: companyData?.jadwal || '',
        email: companyData?.email || '',
    }));

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const result = await updateCompany(formData).unwrap();
            onSuccess?.(result);
        } catch (err) {
            setErrorMsg(err?.data?.message || 'Gagal menyimpan data perusahaan.');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <Building2 className="w-4 h-4 text-blue-600" />
                <h2 className="font-bold text-gray-900 text-sm">Informasi Perusahaan</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {errorMsg && (
                    <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                        {errorMsg}
                    </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                            <Building2 className="w-4 h-4 text-blue-600" />
                            Nama Perusahaan
                        </label>
                        <input
                            type="text"
                            name="namaPerusahaan"
                            value={formData.namaPerusahaan}
                            onChange={handleChange}
                            placeholder="Masukkan nama perusahaan"
                            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                            <Phone className="w-4 h-4 text-green-600" />
                            Telephone
                        </label>
                        <input
                            type="text"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            placeholder="021-5551234"
                            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                            <Mail className="w-4 h-4 text-blue-600" />
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="info@perusahaan.com"
                            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            required
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            Lokasi
                        </label>
                        <input
                            type="text"
                            name="lokasi"
                            value={formData.lokasi}
                            onChange={handleChange}
                            placeholder="Jl. Sudirman No. 45, Jakarta Selatan"
                            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            required
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                            <Clock className="w-4 h-4 text-purple-600" />
                            Jadwal Operasional
                        </label>
                        <input
                            type="text"
                            name="jadwal"
                            value={formData.jadwal}
                            onChange={handleChange}
                            placeholder="Senin - Jumat, 08:00 - 17:00 WIB"
                            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            required
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                            <FileText className="w-4 h-4 text-amber-600" />
                            Deskripsi Perusahaan
                        </label>
                        <textarea
                            name="deskripsiPerusahaan"
                            value={formData.deskripsiPerusahaan}
                            onChange={handleChange}
                            placeholder="Tuliskan deskripsi singkat perusahaan"
                            rows={4}
                            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                            required
                        />
                    </div>
                </div>

                <div className="pt-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Simpan Perubahan
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
