'use client';

import { Package, AlertTriangle, ArrowDownToLine, ArrowUpFromLine, TrendingUp, Printer } from 'lucide-react';
import { useLazyPriontLaporanGabunganQuery } from '@/hooks/api/laporanSliceAPI';
import StatCard from '@/app/components/card/statsCard';
import {
    useTotalBarangQuery,
    useStokTipisQuery,
    useBarangKeluarHariIniQuery,
    useBarangMasukHariIniQuery,
} from '@/hooks/api/dashboardSliceAPI';
import AktivitasTerbaru from '@/app/components/card/AktivitasTerbaru';

const BATAS_STOK_TIPIS = 15;

function TipeBadge({ tipe }) {
    const isMasuk = tipe === 'masuk';
    return (
        <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                isMasuk ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
            }`}
        >
            {isMasuk ? <ArrowDownToLine className="w-3 h-3" /> : <ArrowUpFromLine className="w-3 h-3" />}
            {isMasuk ? 'Masuk' : 'Keluar'}
        </span>
    );
}

export default function DashboardAdmin() {
    const { data: total, isLoading: totalLoading, isError: totalError } = useTotalBarangQuery();
    const barang = total?.data?.summary ?? {};

    const { data: stok, isLoading: stokTipisLoading, isError: stokTipisError } = useStokTipisQuery();
    const stokTipisSummary = stok?.data?.summary ?? {};
    const stokTipisList = stok?.data?.barang ?? [];

    const { data: masuk, isLoading: loadingMasuk, isError: errorMasuk } = useBarangMasukHariIniQuery();
    const stokMasuk = masuk?.data?.summary ?? {};
    const mutasiMasuk = masuk?.data?.mutasi ?? [];

    const { data: keluar, isLoading: loadingKeluar, isError: errorKeluar } = useBarangKeluarHariIniQuery();
    const stokKeluar = keluar?.data?.summary ?? {};
    const mutasiKeluar = keluar?.data?.mutasi ?? [];

    const [triggerCetakPDF] = useLazyPriontLaporanGabunganQuery();

    const getTodayDateString = () => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const handleCetakPDF = async () => {
        try {
            const today = getTodayDateString();

            const blob = await triggerCetakPDF({
                startDate: today,
                endDate: today,
                judul: 'STOK KACA LEGOK',
            }).unwrap();

            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');

            setTimeout(() => window.URL.revokeObjectURL(url), 10000);
        } catch (err) {
            console.error('Gagal cetak PDF:', err);
        }
    };

    const progressTerbaru = [...mutasiMasuk, ...mutasiKeluar]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Ringkasan aktivitas gudang hari ini</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Package} label="Total Barang" value={barang.totalBarang ?? 0} tone="blue" />
                <StatCard
                    icon={AlertTriangle}
                    label="Stok Menipis"
                    value={stokTipisSummary.totalBarang ?? 0}
                    tone="red"
                />
                <StatCard
                    icon={ArrowDownToLine}
                    label="Masuk Hari Ini"
                    value={stokMasuk.totalJumlahMasuk ?? 0}
                    tone="green"
                />
                <StatCard
                    icon={ArrowUpFromLine}
                    label="Keluar Hari Ini"
                    value={stokKeluar.totalJumlahKeluar ?? 0}
                    tone="amber"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Aktivitas terbaru */}
                <AktivitasTerbaru
                    cetakPDF={handleCetakPDF}
                    masukLoading={loadingMasuk}
                    masukError={errorMasuk}
                    keluarError={errorKeluar}
                    keluarLoading={loadingKeluar}
                    terbaru={progressTerbaru}
                />

                {/* Stok menipis */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <h2 className="font-bold text-gray-900 text-sm">Stok Menipis</h2>
                    </div>

                    {stokTipisLoading && <p className="text-sm text-gray-400">Memuat data...</p>}
                    {stokTipisError && <p className="text-sm text-red-500">Gagal memuat data stok.</p>}

                    {!stokTipisLoading && !stokTipisError && stokTipisList.length === 0 && (
                        <p className="text-sm text-gray-400">Tidak ada barang dengan stok menipis</p>
                    )}

                    <div className="space-y-4">
                        {stokTipisList.slice(0, 6).map((item) => {
                            const percent = Math.min(100, Math.round((item.jumlahBarang / BATAS_STOK_TIPIS) * 100));
                            return (
                                <div key={item.id}>
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-medium text-gray-700 truncate pr-2">
                                            {item.namaBarang}
                                        </p>
                                        <p className="text-xs font-semibold text-red-500 shrink-0">
                                            {item.jumlahBarang}/{BATAS_STOK_TIPIS}
                                        </p>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-red-400"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
