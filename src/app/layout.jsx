import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import Providers from './providers';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata = {
    metadataBase: new URL('https://www.berkahkacaalumunium.com'),
    title: {
        default: 'Berkah Kaca Alumunium | Distributor Gypsum, PVC, Kaca & Alumunium Tangerang',
        template: '%s | Berkah Kaca Alumunium',
    },
    description:
        'Berkah Kaca Alumunium adalah distributor bahan bangunan terpercaya di Caringin, Legok, Tangerang. Menyediakan gypsum board, plafon PVC, hollow steel, kaca, alumunium, dan aksesoris dengan harga bersaing serta pengiriman cepat.',
    keywords: [
        'berkah kaca alumunium',
        'distributor gypsum tangerang',
        'plafon pvc tangerang',
        'kaca alumunium legok',
        'toko bahan bangunan caringin',
        'hollow steel tangerang',
        'gypsum board',
    ],
    authors: [{ name: 'Berkah Kaca Alumunium' }],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        title: 'Berkah Kaca Alumunium',
        description:
            'Distributor bahan bangunan terpercaya di Tangerang - gypsum, plafon PVC, kaca, alumunium, dan aksesoris.',
        url: 'https://www.berkahkacaalumunium.com',
        siteName: 'Berkah Kaca Alumunium',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Berkah Kaca Alumunium',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Berkah Kaca Alumunium',
        description: 'Distributor bahan bangunan terpercaya di Tangerang.',
        images: ['/images/og-image.jpg'],
    },
    alternates: {
        canonical: 'https://www.berkahkacaalumunium.com',
    },
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
        >
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                />
            </head>
            <body className="min-h-full flex flex-col">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
