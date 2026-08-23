import { Medal, ShieldCheck, Tags, Truck } from 'lucide-react';

export default function About() {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="section-tag mx-auto"></div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-3">Tentang Kami</h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-base">
                        Distributor utama bahan konstruksi dan bangunan premium, dipercaya oleh kontraktor, arsitek, dan
                        pengembang di Jabodetabek.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-snug">
                            Mitra Lengkap Anda untuk Bahan Bangunan
                        </h3>
                        <p className="text-gray-500 leading-relaxed mb-4">
                            Kaca Alumunium Berkah didirikan untuk membuat bahan bangunan berkualitas tinggi dapat
                            diakses untuk setiap proyek, besar atau kecil. Kami telah berkembang menjadi pemasok layanan
                            lengkap yang mencakup papan gypsum, langit-langit PVC, rangka baja hollow, cat, sekrup, dan
                            berbagai aksesori konstruksi lainnya.
                        </p>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            Gudang kami menyimpan produk dari produsen bersertifikat. Baik kamu sedang menata satu
                            apartemen atau memasok seluruh menara komersial, tim kami siap memberi saran, memberikan
                            penawaran, dan mengantar tepat waktu, setiap saat.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 card-hover">
                            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                                <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">Supplier Terpercaya</h4>
                            <p className="text-gray-500 text-sm">
                                Telah menyelesaikan ratusan proyek di wilayah Jabodetabek.
                            </p>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm card-hover">
                            <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                <Medal className="w-5 h-5 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">Kualitas Tinggi</h4>
                            <p className="text-gray-500 text-sm">Semua produk memenuhi standar kualitas nasional.</p>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm card-hover">
                            <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                <Tags className="w-5 h-5 text-green-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">Harga Bersaing</h4>
                            <p className="text-gray-500 text-sm">
                                Harga pasar terbaik dengan diskon pembelian dalam jumlah banyak.
                            </p>
                        </div>
                        <div className="bg-blue-600 rounded-2xl p-5 card-hover">
                            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                <Truck className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="font-bold text-white mb-1">Pengiriman Cepat</h4>
                            <p className="text-blue-100 text-sm">
                                Pengiriman hari yang sama untuk pesanan yang ada di stok.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
