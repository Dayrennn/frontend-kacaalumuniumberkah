'use client';

import { useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { useRemoveUserMutation } from '@/hooks/api/userSliceAPI';

export default function FormHapusUser({ initialData, onCancel, onSuccess }) {
    const [removeUser, { isLoading, isError, error }] = useRemoveUserMutation();
    const [username, setUsername] = useState('');

    const isMatch = username.trim() === initialData?.username;

    const handleRemove = async (e) => {
        e.preventDefault();
        if (!isMatch) {
            return;
        }

        try {
            const result = await removeUser({
                id: initialData.id,
                data: { username },
            }).unwrap();

            if (onSuccess) {
                onSuccess(result);
            }
        } catch (err) {
            console.error('EERROR', err);
        }
    };

    const errorMessage = error?.data?.message || (isError ? 'Gagal menghapus user.' : '');

    return (
        <form onSubmit={handleRemove}>
            <div className="px-6 py-5 space-y-4">
                {/* Peringatan */}
                <div className="flex items-start gap-2.5 bg-red-50 rounded-xl px-3.5 py-3">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700 leading-relaxed">
                        Semua data terkait user ini, termasuk riwayat transaksi, akan ikut terhapus permanen dan tidak
                        bisa dikembalikan. Apakah kamu yakin?
                    </p>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                        Ketik <span className="text-gray-900">{initialData?.username}</span> untuk konfirmasi
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={initialData?.username}
                        autoFocus
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400"
                    />
                    {errorMessage && <p className="text-xs text-red-500 mt-1.5">{errorMessage}</p>}
                </div>
            </div>

            <div className="flex items-center gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition-colors text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 disabled:opacity-50"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={isLoading || !isMatch}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Menghapus...
                        </>
                    ) : (
                        'Hapus username'
                    )}
                </button>
            </div>
        </form>
    );
}
