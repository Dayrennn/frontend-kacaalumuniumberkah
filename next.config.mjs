/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/u4oqm3t7/**', // sesuaikan cloud_name kamu
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
            },
            {
                source: '/uploads/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/:path*`,
            },
        ];
    },
};

export default nextConfig;
