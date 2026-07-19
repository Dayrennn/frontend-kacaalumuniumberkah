'use client';

import { useState } from 'react';
import { Image as ImageIcon, Save, Loader2, Type, Upload, X } from 'lucide-react';
import { useCreateBannerMutation } from '@/hooks/api/companySliceAPI';

export default function BannerForm({ bannerData, onSuccess }) {
    const [createBanner, { isLoading: isSaving }] = useCreateBannerMutation();

    const [judul, setJudul] = useState(bannerData?.judul || '');
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(bannerData?.bannerImageUrl || null);
    const [errorMsg, setErrorMsg] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            setErrorMsg('Format file tidak didukung. Hanya JPG, PNG, WEBP.');
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setErrorMsg('Ukuran file maksimal 5MB');
            return;
        }

        setImageFile(file);
        setErrorMsg('');
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setPreviewUrl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!imageFile && !bannerData?.bannerImageUrl) {
            setErrorMsg('Gambar banner wajib diupload.');
            return;
        }
        if (!judul.trim()) {
            setErrorMsg('Judul banner wajib diisi.');
            return;
        }

        const payload = new FormData();
        payload.append('judul', judul);
        if (imageFile) {
            payload.append('bannerImageUrl', imageFile);
        }

        try {
            const result = await createBanner(payload).unwrap();
            onSuccess?.(result);
        } catch (err) {
            setErrorMsg(err?.data?.message || 'Gagal menyimpan banner.');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <h2 className="font-bold text-gray-900 text-sm">Banner Landing Page</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {errorMsg && (
                    <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                        {errorMsg}
                    </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                    {/* Judul */}
                    <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                            <Type className="w-4 h-4 text-blue-600" />
                            Judul Banner
                        </label>
                        <input
                            type="text"
                            name="judul"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            placeholder="Masukkan judul banner"
                            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            required
                        />
                    </div>

                    {/* Upload gambar */}
                    <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                            <ImageIcon className="w-4 h-4 text-purple-600" />
                            Gambar Banner
                        </label>

                        {previewUrl ? (
                            <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
                                <img src={previewUrl} alt="Preview banner" className="w-full h-48 object-cover" />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-white/90 text-gray-500 hover:text-red-600 hover:bg-white shadow-sm transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center gap-2 w-full h-48 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/40 cursor-pointer transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <Upload className="w-5 h-5 text-blue-600" />
                                </div>
                                <p className="text-sm font-medium text-gray-600">Klik untuk upload gambar</p>
                                <p className="text-xs text-gray-400">PNG, JPG, atau WEBP (maks. 5MB)</p>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        )}
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
                                Simpan Banner
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
