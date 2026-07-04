export default function Address() {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <div className="section-tag mx-auto"></div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Lokasi Kami</h2>
                    <p className="text-blue-600 max-w-xl mx-auto text-base">
                        Kunjungi gudang kami — kami menyambut kontraktor, arsitek, dan pembeli individu.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    {/* Info card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
                        <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
                            <div>
                                <h3 className="font-extrabold text-gray-900 text-lg leading-tight">
                                    Berkah Kaca Alumunium
                                </h3>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-location-dot text-blue-600"></i>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm mb-0.5">Alamat</p>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Caringin, Kec. Legok, Kabupaten Tangerang, Banten
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-phone text-green-600"></i>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm mb-0.5">Whatsapp / Telephone</p>
                                <a
                                    href="https://wa.me/6282310134497"
                                    target="_blank"
                                    className="text-blue-600 text-sm font-medium hover:underline"
                                >
                                    +62 82310134497
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-envelope text-blue-600"></i>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm mb-0.5">Email</p>
                                <a
                                    href="mailto:bkh.pvc@gmail.com"
                                    className="text-blue-600 text-sm font-medium hover:underline"
                                >
                                    bkh.pvc@gmail.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-clock text-purple-600"></i>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm mb-1">Jadwal</p>
                                <div className="text-gray-500 text-sm space-y-0.5">
                                    <p>
                                        Senin – Minggu: <span className="font-medium text-gray-700">08:00 – 17:00</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex gap-3">
                            <a
                                href="https://wa.me/6282310134497"
                                target="_blank"
                                className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white text-blue-600 transition-all"
                                aria-label="WhatsApp"
                            >
                                <i className="fa-brands fa-whatsapp text-sm"></i>
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white text-blue-600 transition-all"
                                aria-label="Facebook"
                            >
                                <i className="fa-brands fa-facebook-f text-sm"></i>
                            </a>
                        </div>
                    </div>

                    {/* Map */}
                    <div
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                        style={{ minHeight: 400 }}
                    >
                        <iframe
                            title="Berkah Kaca Alumunium"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.70298182421504!2d106.5844803227561!3d-6.313043738404559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e3299b09be01%3A0xe9e34d0b8d3c324c!2sBERKAH%20KACA%20ALUMUNIUM!5e0!3m2!1sid!2sid!4v1782625370999!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: 400 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
