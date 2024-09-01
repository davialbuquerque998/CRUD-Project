/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXT_PUBLIC_ENDPOINT:process.env.NEXT_PUBLIC_ENDPOINT,
        NEXT_PUBLIC_PASSWORD:process.env.NEXT_PUBLIC_PASSWORD
    }
};

export default nextConfig;