/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        IMGUR_LINK: process.env.IMGUR_LINK,
        IMGUR_ID: process.env.IMGUR_ID,
        BACK_LINK: process.env.BACK_LINK,
        MAILGUN_LINK: process.env.MAILGUN_LINK,
        MAILGUN_TOKEN: process.env.MAILGUN_TOKEN,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
            },
            {
                protocol: 'https',
                hostname: 'i.postimg.cc',
            },
            {
                protocol: 'https',
                hostname: 'staticw.s3.amazonaws.com',
            },
        ]
    }
}

module.exports = nextConfig
