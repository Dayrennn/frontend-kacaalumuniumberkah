'use client';

import { useSeeAllCompanyQuery } from '@/hooks/api/companySliceAPI';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

export default function Address() {
    const { data: response } = useSeeAllCompanyQuery();
    const companyData = response?.data || [];

    const namaPerusahaan = companyData?.namaPerusahaan || 'Kaca Alumunium Berkah';
    const lokasiPerusahaan = companyData?.lokasi;
    const telephonePerusahaan = companyData?.telephone;
    const telephoneKedua = companyData?.secondTelephone;
    const emailPerusahaan = companyData?.email;
    const jadwalPerusahaan = companyData?.jadwal;

    // Format nomor telephone ke format wa.me (62xxxxxxxxxx, tanpa strip/spasi)
    const formatWhatsAppNumber = (phone) => {
        if (!phone) return '';
        // Hapus semua karakter selain angka
        let cleaned = phone.replace(/\D/g, '');
        // Kalau diawali '0', ganti jadi '62'
        if (cleaned.startsWith('0')) {
            cleaned = '62' + cleaned.slice(1);
        }
        // Kalau belum diawali '62' sama sekali (misal cuma '8123...'), tambahkan '62'
        else if (!cleaned.startsWith('62')) {
            cleaned = '62' + cleaned;
        }
        return cleaned;
    };

    const waNumber = formatWhatsAppNumber(telephonePerusahaan);
    const waLink = `https://wa.me/${waNumber}`;
    const waNumber2 = formatWhatsAppNumber(telephoneKedua);
    const waLink2 = `https://wa.me/${waNumber2}`;

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
                                <h3 className="font-extrabold text-gray-900 text-lg leading-tight">{namaPerusahaan}</h3>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm mb-0.5">Alamat</p>
                                <p className="text-gray-500 text-sm leading-relaxed">{lokasiPerusahaan}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Phone className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm mb-0.5">Whatsapp / Telephone</p>
                                <a
                                    href={waLink}
                                    target="_blank"
                                    className="text-blue-600 text-sm font-medium hover:underline"
                                >
                                    +{waNumber}
                                </a>
                                {telephoneKedua && (
                                    <>
                                        <br />
                                        <a
                                            href={waLink2}
                                            target="_blank"
                                            className="text-blue-600 text-sm font-medium hover:underline"
                                        >
                                            +{waNumber2}
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Mail className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm mb-0.5">Email</p>
                                <a
                                    href={`mailto:${emailPerusahaan}`}
                                    className="text-blue-600 text-sm font-medium hover:underline"
                                >
                                    {emailPerusahaan}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Clock className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm mb-1">Jadwal</p>
                                <div className="text-gray-500 text-sm space-y-0.5">
                                    <p>{jadwalPerusahaan}</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="pt-4 border-t border-gray-100 flex gap-3">
                            <a
                                href={waLink}
                                target="_blank"
                                className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white text-blue-600 transition-all"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white text-blue-600 transition-all"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="w-4 h-4" />
                            </a>
                        </div> */}
                    </div>

                    {/* Map */}
                    <div
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                        style={{ minHeight: 400 }}
                    >
                        <iframe
                            title="Kaca Alumunium Berkah Alumunium"
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
