'use client';

import { Trash2, X } from 'lucide-react';
import ModalSukses from '../successModal';
import { useState } from 'react';

export default function ModalHapus({
    onClose,
    formHapus: FormHapusKategori,
    successTitle,
    successMessage,
    initialData,
    onAfterSuccess,
    ...formProps
}) {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAfterSuccess = () => {
        if (onAfterSuccess) onAfterSuccess();
        setShowSuccess(true);
    };

    if (showSuccess) {
        return <ModalSukses onClose={onClose} title={successTitle} message={successMessage} />;
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />

            {/* Modal card */}
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Trash2 className="w-4 h-4 text-red-600" />
                        </div>
                        <h3 className="font-extrabold text-gray-900 text-sm">Hapus Kategori</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <FormHapusKategori
                    initialData={initialData}
                    onSuccess={handleAfterSuccess}
                    onCancel={onClose}
                    {...formProps}
                />
            </div>
        </div>
    );
}
