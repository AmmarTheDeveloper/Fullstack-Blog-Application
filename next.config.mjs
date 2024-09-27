/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },

    images: {
        unoptimized: false,
        domains: [ 'cdn-icons-png.flaticon.com', 'i.ytimg.com', "res.cloudinary.com" ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
};

export default nextConfig;
