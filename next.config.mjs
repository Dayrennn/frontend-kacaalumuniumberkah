/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
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
