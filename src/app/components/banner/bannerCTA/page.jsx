import Image from 'next/image';

export default function BannerCTA() {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="cta-banner rounded-3xl px-8 py-16 text-center relative overflow-hidden">
                    {/* Background photo */}
                    <Image
                        src="/images/CTA.jpg"
                        alt="Building materials background"
                        fill
                        priority
                        className="object-cover"
                    />

                    {/* Blue overlay di atas foto */}
                    <div className="absolute inset-0 bg-blue-700/60"></div>
                    {/* Kalau mau efek gradient, ganti dengan:
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-700/75 to-blue-800/85"></div>
                        */}

                    {/* Dekorasi lingkaran tetap di atas overlay */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-24 -translate-y-24 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-5 rounded-full translate-x-28 translate-y-28 pointer-events-none"></div>
                    <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white opacity-5 rounded-full pointer-events-none"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                            Butuh Plavon PVC?
                        </h2>
                        <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto mb-10">
                            Tim kami siap membantu memilih produk, harga grosir, dan pengiriman cepat untuk proyek Anda
                            berikutnya.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://wa.me/6282310134497"
                                target="_blank"
                                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm sm:text-base"
                            >
                                <i className="fa-brands fa-whatsapp text-green-500 text-lg"></i> Chat via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
