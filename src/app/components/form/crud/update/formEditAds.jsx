'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useModifyProdukAdsMutation } from '@/hooks/api/produkAdsSliceAPI';
import BarangSearchDropdown from '@/app/components/dropdown/barangSearchDropdown';
import BACKEND_URL from '@/hooks/lib/backendUrl';

export default function FormEditAds({ initialData, onCancel, onSuccess }) {
    const [updateAds, { isLoading, isError, error }] = useModifyProdukAdsMutation();
    const [barangId, setBarangId] = useState(initialData?.barangId || '');
    const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi || '');
    const [formError, setFormError] = useState('');

    const [produkAdsImage, setProdukAdsImage] = useState(null); 
    const [produkImageUrl, setProdukImageUrl] = useState(
        initialData?.produkImageUrl ? `${BACKEND_URL}${initialData.produkImageUrl}` : '',
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            setFormError('Format file tidak didukung. Hanya JPG, PNG, WEBP.');
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setFormError('Ukuran file maksimal 5MB');
            return;
        }

        setFormError('');
        setProdukAdsImage(file);
        setProdukImageUrl(URL.createObjectURL(file));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!barangId) {
            setFormError('Barang wajib dipilih');
            return;
        }
        if (!deskripsi.trim()) {
            setFormError('Deskripsi wajib diisi');
            return;
        }

        const formData = new FormData();
        if (produkAdsImage) {
            formData.append('produkImageUrl', produkAdsImage); // hanya kirim kalau memang ganti gambar
        }
        formData.append('barangId', barangId);
        formData.append('deskripsi', deskripsi);

        try {
            const update = await updateAds({ id: initialData.id, data: formData }).unwrap();
            onSuccess?.(update);
        } catch (err) {
            console.error('UPDATE ADS ERROR', err);
            setFormError(err?.data?.message || 'Gagal mengubah iklan');
        }
    };

    const errorMessage = formError || error?.data?.message || (isError ? 'Gagal update iklan' : '');

    return (
        <form onSubmit={handleUpdate}>
            <div className="px-6 py-5 space-y-4">
                {errorMessage && (
                    <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        {errorMessage}
                    </p>
                )}

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Barang</label>
                    <BarangSearchDropdown
                        value={barangId}
                        onChange={setBarangId}
                        initialLabel={initialData?.barang?.namaBarang}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Deskripsi</label>
                    <textarea
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        className="w-full border rounded-md p-2 text-sm"
                        rows={3}
                        placeholder="Tulis deskripsi iklan..."
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Gambar Produk</label>
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} />
                    {produkImageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={produkImageUrl}
                            alt="Preview"
                            className="mt-2 w-40 h-40 object-cover rounded-md border"
                        />
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md border"
                        disabled={isLoading}
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-blue-600 text-white flex items-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isLoading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </div>
        </form>
    );
}
