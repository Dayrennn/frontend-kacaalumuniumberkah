'use client';

import { useSeeAllCompanyQuery } from '@/hooks/api/companySliceAPI';
import Navbar from './components/page/navbar/page';
import HeroBanner from './components/banner/hero/page';
import About from './components/page/about/page';
import Produk from './components/page/produk/page';
import Keuntungan from './components/page/keuntungan/page';
import Address from './components/page/address/page';
import BannerCTA from './components/banner/bannerCTA/page';
import Footer from './components/footer/page';
import HomeSkeleton from './components/skeleton/homeSkeleton';
import './page.css';

export default function Home() {
    const { isLoading } = useSeeAllCompanyQuery();

    if (isLoading) {
        return <HomeSkeleton />;
    }

    return (
        <>
            <div className="bg-white text-gray-800 antialiased" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <header
                    id="navbar"
                    className="navbar-glass fixed top-0 left-0 right-0 z-50 border-b border-gray-100 shadow-sm"
                >
                    <Navbar />
                </header>

                <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
                    <HeroBanner />
                </section>

                <section id="about" className="py-24 bg-white">
                    <About />
                </section>

                <section id="products" className="py-24 bg-gray-50">
                    <Produk />
                </section>

                <section id="benefit" className="py-24 bg-white">
                    <Keuntungan />
                </section>

                <section id="address" className="py-24 bg-gray-50">
                    <Address />
                </section>

                <section id="contact" className="py-20">
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
                        name: 'Berkah Kaca Alumunium',
                        image: 'https://www.berkahkacaalumunium.com/images/og-image.jpg',
                        url: 'https://www.berkahkacaalumunium.com',
                        telephone: '+62811234567',
                        email: 'info@berkahkacaalumunium.com',
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
        </>
    );
}
