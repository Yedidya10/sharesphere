/** @type {import('next').NextConfig} */
// const nextTranslate = require('next-translate-plugin')

const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    './i18n.ts'
);

module.exports = withNextIntl({
    images: {
        domains: ['source.unsplash.com', 'images.unsplash.com', 'plus.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                port: '',
                pathname: '/*/**',
            },
        ],
    },
});

// module.exports = nextTranslate({
//     reactStrictMode: true,

//     images: {
//         domains: ['source.unsplash.com'],
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: '*',
//                 port: '',
//                 pathname: '/*/**',
//             },
//         ],
//     },

// })