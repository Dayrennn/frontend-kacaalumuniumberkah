import { Award, CircleDollarSign, Star, Warehouse, Zap } from 'lucide-react';

export default function Keuntungan() {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <div className="section-tag mx-auto"></div>
                    <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">Keuntungan</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                        Mengapa harus memilih Berkah Kaca Alumunium?
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-base">
                        Kami menggabungkan pengetahuan produk yang mendalam, stok besar, dan logistik yang andal untuk
                        memberikan nilai luar biasa di setiap pesanan.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            bg: 'bg-blue-100',
                            Icon: Zap,
                            color: 'text-blue-600',
                            title: 'Fast Response',
                            desc: 'Tim admin kami merespons pesan dengan cepat selama jam kerja.',
                        },
                        {
                            bg: 'bg-green-100',
                            Icon: Warehouse,
                            color: 'text-green-600',
                            title: 'Stok Banyak',
                            desc: 'Gudang seluas 2.500 m² dengan lebih dari 500 SKU selalu siap untuk dibeli langsung atau untuk pesanan B2B.',
                        },
                        {
                            bg: 'bg-yellow-100',
                            Icon: Award,
                            color: 'text-yellow-600',
                            title: 'Supplier Terpercaya',
                            desc: 'Mitra resmi dan distributor resmi untuk merek-merek nasional terkemuka.',
                        },
                        {
                            bg: 'bg-pink-100',
                            Icon: CircleDollarSign,
                            color: 'text-pink-600',
                            title: 'Harga Terjangkau',
                            desc: 'Harga ritel dan grosir yang kompetitif dengan diskon bertingkat untuk pembelian besar bagi kontraktor.',
                        },
                        {
                            bg: null,
                            Icon: Star,
                            color: 'text-white',
                            title: 'Jaminan Kualitas',
                            desc: 'Setiap produk dilengkapi garansi pabrik. Barang yang cacat bisa ditukar, tanpa banyak tanya.',
                            dark: true,
                        },
                    ].map((f) => (
                        <div
                            key={f.title}
                            className={`${f.dark ? 'bg-blue-600' : 'bg-gray-50 border border-gray-100'} rounded-2xl p-6 card-hover`}
                        >
                            <div
                                className={`w-12 h-12 ${f.dark ? 'bg-white/20' : f.bg} rounded-xl flex items-center justify-center mb-4`}
                            >
                                <f.Icon className={`w-5 h-5 ${f.color}`} />
                            </div>
                            <h4 className={`font-bold text-lg mb-2 ${f.dark ? 'text-white' : 'text-gray-900'}`}>
                                {f.title}
                            </h4>
                            <p className={`text-sm leading-relaxed ${f.dark ? 'text-blue-100' : 'text-gray-500'}`}>
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
