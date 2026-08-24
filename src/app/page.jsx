import Image from 'next/image';
import { ChevronDown, Headset } from 'lucide-react';
import { FaBoxOpen } from 'react-icons/fa';
import 'aos/dist/aos.css';
import Navbar from './components/page/navbar/page';
import About from './components/page/about/page';
import Produk from './components/page/produk/page';
import Keuntungan from './components/page/keuntungan/page';
import Address from './components/page/address/page';
import BannerCTA from './components/banner/bannerCTA/page';
import Footer from './components/footer/page';
import AOSProvider from './components/AOSProvider';
import './page.css';

export default function Home() {
    return (
        <AOSProvider>
            <div className="bg-white text-gray-800 antialiased" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <header
                    id="navbar"
                    className="navbar-glass fixed top-0 left-0 right-0 z-50 border-b border-gray-100 shadow-sm"
                >
                    <Navbar />
                </header>

                <section id="Beranda" className="relative min-h-screen flex items-center overflow-hidden pt-16">
                    <Image
                        src="/images/hero.jpg"
                        alt="Berkah Kaca Alumunium - Distributor Bahan Bangunan"
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="100vw"
                    />

                    {/* Overlay gradient biru dari kiri */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/70 to-transparent pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                        <div className="max-w-xl">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
                                Kaca Alumunium
                                <br />
                                <span className="text-blue-300">Berkah</span>
                            </h1>

                            <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-8">
                                Distributor bahan bangunan berkualitas seperti kaca, aluminium, plafon PVC, gypsum,
                                hollow, dan berbagai kebutuhan konstruksi lainnya.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#produk"
                                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
                                >
                                    <FaBoxOpen className="w-4 h-4" />
                                    Lihat Produk
                                </a>

                                <a
                                    href="#kontak"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/30 transition-all"
                                >
                                    <Headset className="w-4 h-4" />
                                    Hubungi Kami
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 bounce-slow">
                        <span className="text-xs font-medium">Scroll Kebawah</span>
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </section>

                <section id="Tentang" className="py-24 bg-white" data-aos="fade-up">
                    <About />
                </section>

                <section id="Produk" className="py-24 bg-gray-50" data-aos="fade-up">
                    <Produk />
                </section>

                <section id="Keuntungan" className="py-24 bg-white" data-aos="fade-up">
                    <Keuntungan />
                </section>

                <section id="Alamat" className="py-24 bg-gray-50" data-aos="fade-up">
                    <Address />
                </section>

                <section id="Kontak" className="py-20" data-aos="fade-up">
                    <BannerCTA />
                </section>

                <footer className="bg-gray-900 text-gray-400">
                    <Footer />
                </footer>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'HomeAndConstructionBusiness',
                        name: 'Kaca Alumunium Alumunium',
                        image: 'https://kacaalumuniumberkah.com/images/og-image.jpg',
                        url: 'https://kacaalumuniumberkah.com',
                        telephone: '+62811234567',
                        email: 'kacaalumuniumberkah@gmail.com',
                        address: {
                            '@type': 'PostalAddress',
                            streetAddress: 'Caringin',
                            addressLocality: 'Legok',
                            addressRegion: 'Kabupaten Tangerang',
                            addressCountry: 'ID',
                        },
                        geo: {
                            '@type': 'GeoCoordinates',
                            latitude: -6.313043738404559,
                            longitude: 106.5844803227561,
                        },
                        openingHoursSpecification: [
                            {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                                opens: '07:30',
                                closes: '17:00',
                            },
                            {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: ['Saturday', 'Sunday'],
                                opens: '08:00',
                                closes: '15:00',
                            },
                        ],
                        priceRange: '$$',
                    }),
                }}
            />
        </AOSProvider>
    );
}
