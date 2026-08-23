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
    metadataBase: new URL('https://kacaalumuniumberkah.com'),
    title: {
        default: 'Kaca Alumunium Berkah | Distributor Gypsum, PVC, Kaca & Alumunium Tangerang',
        template: '%s | Kaca Alumunium Berkah',
    },
    description:
        'Kaca Alumunium Berkah adalah distributor bahan bangunan terpercaya di Caringin, Legok, Tangerang. Menyediakan gypsum board, plafon PVC, hollow steel, kaca, alumunium, dan aksesoris dengan harga bersaing serta pengiriman cepat.',
    keywords: [
        'Kaca Alumunium Berkah',
        'distributor gypsum tangerang',
        'plafon pvc tangerang',
        'kaca alumunium legok',
        'toko bahan bangunan caringin',
        'hollow steel tangerang',
        'gypsum board',
        'plavon pvc',
        'pvc',
        'hollow',
        'ornamen',
    ],
    authors: [{ name: 'Kaca Alumunium Berkah' }],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        title: 'Kaca Alumunium Berkah',
        description:
            'Distributor bahan bangunan terpercaya di Tangerang - gypsum, plafon PVC, kaca, alumunium, dan aksesoris.',
        url: 'https://kacaalumuniumberkah.com',
        siteName: 'Kaca Alumunium Berkah',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Kaca Alumunium Berkah',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kaca Alumunium Berkah',
        description: 'Distributor bahan bangunan terpercaya di Tangerang.',
        images: ['/images/og-image.jpg'],
    },
    alternates: {
        canonical: 'https://kacaalumuniumberkah.com',
    },
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="id"
            className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
