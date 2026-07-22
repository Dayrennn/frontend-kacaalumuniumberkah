'use client';

import {
    Package,
    AlertTriangle,
    ArrowDownToLine,
    ArrowUpFromLine,
    TrendingUp,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const SUMMARY = {
    totalBarang: 248,
    totalKategori: 12,
    stokMenipis: 6,
    masukHariIni: 34,
    keluarHariIni: 21,
};

const CHART_DATA = [
    { day: 'Sen', masuk: 40, keluar: 24 },
    { day: 'Sel', masuk: 30, keluar: 18 },
    { day: 'Rab', masuk: 52, keluar: 35 },
    { day: 'Kam', masuk: 27, keluar: 20 },
    { day: 'Jum', masuk: 45, keluar: 30 },
    { day: 'Sab', masuk: 18, keluar: 12 },
    { day: 'Min', masuk: 34, keluar: 21 },
];

const AKTIVITAS_TERBARU = [
    { id: 1, barang: 'Semen Portland 40kg', kategori: 'Bahan Bangunan', tipe: 'masuk', jumlah: 120, tanggal: '02 Jul 2026' },
    { id: 2, barang: 'Kabel NYM 2x1.5mm', kategori: 'Elektrikal', tipe: 'keluar', jumlah: 45, tanggal: '02 Jul 2026' },
    { id: 3, barang: 'Cat Tembok Putih 5L', kategori: 'Finishing', tipe: 'masuk', jumlah: 60, tanggal: '01 Jul 2026' },
    { id: 4, barang: 'Pipa PVC 3 inch', kategori: 'Plumbing', tipe: 'keluar', jumlah: 30, tanggal: '01 Jul 2026' },
    { id: 5, barang: 'Paku Beton 3cm', kategori: 'Alat & Perkakas', tipe: 'masuk', jumlah: 200, tanggal: '30 Jun 2026' },
];

const STOK_MENIPIS = [
    { id: 1, barang: 'Semen Portland 40kg', stok: 8, minStok: 20 },
    { id: 2, barang: 'Lem Kayu Fox 250gr', stok: 3, minStok: 15 },
    { id: 3, barang: 'Amplas Kasar No.80', stok: 5, minStok: 25 },
    { id: 4, barang: 'Sekrup Gypsum 1"', stok: 12, minStok: 30 },
];

/* ---------------------------------------------
   Sub-komponen
--------------------------------------------- */
function StatCard({ icon: IconComp, label, value, tone = 'blue' }) {
    const tones = {
        blue: 'bg-blue-50 text-blue-600',
        red: 'bg-red-50 text-red-600',
        green: 'bg-green-50 text-green-600',
        amber: 'bg-amber-50 text-amber-600',
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tones[tone]}`}>
                <IconComp className="w-5 h-5" />
            </div>
            <div className="min-w-0">
                <p className="text-gray-500 text-xs font-medium truncate">{label}</p>
                <p className="text-gray-900 text-xl font-extrabold mt-0.5">{value}</p>
            </div>
        </div>
    );
}

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
    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Ringkasan aktivitas gudang hari ini</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Package} label="Total Barang" value={SUMMARY.totalBarang} tone="blue" />
                <StatCard icon={AlertTriangle} label="Stok Menipis" value={SUMMARY.stokMenipis} tone="red" />
                <StatCard icon={ArrowDownToLine} label="Masuk Hari Ini" value={SUMMARY.masukHariIni} tone="green" />
                <StatCard icon={ArrowUpFromLine} label="Keluar Hari Ini" value={SUMMARY.keluarHariIni} tone="amber" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="font-bold text-gray-900 text-sm">Pergerakan Stok</h2>
                            <p className="text-gray-400 text-xs mt-0.5">7 hari terakhir</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Masuk
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-sky-300"></span> Keluar
                            </span>
                        </div>
                    </div>

                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CHART_DATA} barGap={4}>
                                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{
                                        borderRadius: 12,
                                        border: '1px solid #f1f5f9',
                                        fontSize: 12,
                                    }}
                                />
                                <Bar dataKey="masuk" fill="#2563eb" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="keluar" fill="#93c5fd" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Stok menipis */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <h2 className="font-bold text-gray-900 text-sm">Stok Menipis</h2>
                    </div>

                    <div className="space-y-4">
                        {STOK_MENIPIS.map((item) => {
                            const percent = Math.min(100, Math.round((item.stok / item.minStok) * 100));
                            return (
                                <div key={item.id}>
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-medium text-gray-700 truncate pr-2">{item.barang}</p>
                                        <p className="text-xs font-semibold text-red-500 shrink-0">
                                            {item.stok}/{item.minStok}
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

            {/* Aktivitas terbaru */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
                                <th className="px-5 py-3 font-semibold">Jumlah</th>
                                <th className="px-5 py-3 font-semibold">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {AKTIVITAS_TERBARU.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50/60 transition-colors">
                                    <td className="px-5 py-3 font-medium text-gray-900">{row.barang}</td>
                                    <td className="px-5 py-3 text-gray-500">{row.kategori}</td>
                                    <td className="px-5 py-3">
                                        <TipeBadge tipe={row.tipe} />
                                    </td>
                                    <td className="px-5 py-3 text-gray-700">{row.jumlah}</td>
                                    <td className="px-5 py-3 text-gray-400">{row.tanggal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}