/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        ENDPOINT:process.env.ENDPOINT,
        PASSWORD:process.env.PASSWORD
    }
};

export default nextConfig;