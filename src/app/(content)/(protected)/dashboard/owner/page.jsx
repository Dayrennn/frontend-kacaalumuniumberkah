'use client';

import { Package, AlertTriangle, ArrowDownToLine, ArrowUpFromLine, TrendingUp } from 'lucide-react';
import StatCard from '@/app/components/card/statsCard';
import {
    useTotalBarangQuery,
    useStokTipisQuery,
    useBarangKeluarHariIniQuery,
    useBarangMasukHariIniQuery,
} from '@/hooks/api/dashboardSliceAPI';

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

    const { data: masuk, isLoading: masukLoading, isError: masukError } = useBarangMasukHariIniQuery();
    const stokMasuk = masuk?.data?.summary ?? {};
    const mutasiMasuk = masuk?.data?.mutasi ?? [];

    const { data: keluar, isLoading: keluarLoading, isError: keluarError } = useBarangKeluarHariIniQuery();
    const stokKeluar = keluar?.data?.summary ?? {};
    const mutasiKeluar = keluar?.data?.mutasi ?? [];

    const aktivitasTerbaru = [...mutasiMasuk, ...mutasiKeluar]
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
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                            <h2 className="font-bold text-gray-900 text-sm">Aktivitas Terbaru</h2>
                        </div>
                        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">Lihat Semua</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                                    <th className="px-5 py-3 font-semibold">Barang</th>
                                    <th className="px-5 py-3 font-semibold">Kategori</th>
                                    <th className="px-5 py-3 font-semibold">Tipe</th>
                                    <th className="px-5 py-3 font-semibold">Jenis Penjualan</th>
                                    <th className="px-5 py-3 font-semibold">Jumlah</th>
                                    <th className="px-5 py-3 font-semibold">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(masukLoading || keluarLoading) && (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-4 text-center text-gray-400">
                                            Memuat aktivitas...
                                        </td>
                                    </tr>
                                )}

                                {(masukError || keluarError) && !masukLoading && !keluarLoading && (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-4 text-center text-red-500">
                                            Gagal memuat data aktivitas.
                                        </td>
                                    </tr>
                                )}

                                {!masukLoading &&
                                    !keluarLoading &&
                                    !masukError &&
                                    !keluarError &&
                                    aktivitasTerbaru.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-5 py-4 text-center text-gray-400">
                                                Belum ada aktivitas hari ini
                                            </td>
                                        </tr>
                                    )}

                                {aktivitasTerbaru.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3 font-medium text-gray-900">
                                            {row.barang?.namaBarang}
                                        </td>
                                        <td className="px-5 py-3 text-gray-500">
                                            {row.barang?.kategori?.namaKategori}
                                        </td>
                                        <td className="px-5 py-3">
                                            <TipeBadge tipe={row.tipe === 'Masuk' ? 'masuk' : 'keluar'} />
                                        </td>
                                        <td className="px-5 py-3 text-gray-500">
                                            {row.barang?.jenisPenjualan}
                                        </td>
                                        <td className="px-5 py-3 text-gray-700">{row.jumlah}</td>
                                        <td className="px-5 py-3 text-gray-400">
                                            {new Date(row.createdAt).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

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
