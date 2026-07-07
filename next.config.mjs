/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    reactCompiler: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://backend-kacaalumuniumberkah.vercel.app/:path*',
            },
        ];
    },
};

export default nextConfig;
