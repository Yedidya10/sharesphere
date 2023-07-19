/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')

module.exports = nextTranslate({
    images: {
        domains: ['source.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                port: '',
                pathname: '/*/**',
            },
        ],
    },

})