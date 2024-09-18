/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },

    images: {
        domains: [ 'cdn-icons-png.flaticon.com', 'i.ytimg.com' ], // Add your external domains here
    },
};

export default nextConfig;
