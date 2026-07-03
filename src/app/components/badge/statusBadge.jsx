import { CheckCircle2, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
    const isAktif = status === 'Aktif';
    return (
        <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                isAktif ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}
        >
            {isAktif ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
            {isAktif ? 'Aktif' : 'Nonaktif'}
        </span>
    );
}