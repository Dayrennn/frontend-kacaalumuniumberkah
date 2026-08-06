'use client';

import { Printer, TrendingUp, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

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

export default function AktivitasTerbaru({ terbaru, cetakPDF, masukLoading, masukError, keluarError, keluarLoading }) {
    return (
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <h2 className="font-bold text-gray-900 text-sm">Aktivitas Terbaru</h2>
                </div>
                <button
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 transition-colors text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm"
                    onClick={cetakPDF}
                >
                    <Printer className="w-4 h-4" />
                    Cetak Laporan PDF
                </button>
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
                            terbaru.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-4 text-center text-gray-400">
                                        Belum ada aktivitas hari ini
                                    </td>
                                </tr>
                            )}

                        {terbaru.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50/60 transition-colors">
                                <td className="px-5 py-3 font-medium text-gray-900">{row.barang?.namaBarang}</td>
                                <td className="px-5 py-3 text-gray-500">{row.barang?.kategori?.namaKategori}</td>
                                <td className="px-5 py-3">
                                    <TipeBadge tipe={row.tipe === 'Masuk' ? 'masuk' : 'keluar'} />
                                </td>
                                <td className="px-5 py-3 text-gray-500">{row.barang?.jenisPenjualan}</td>
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
    );
}
