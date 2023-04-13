/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				hostname: 'localhost',
				protocol: 'http',
				port: '3172',
				pathname: '/api/uploads/**',
			},
			{
				hostname: 'aresmeta-back.sqkrv.com',
				protocol: 'https',
				pathname: '/api/uploads/**',
			},
			{
				hostname: 'aresapi.techno-ares.ru',
				protocol: 'https',
				pathname: '/api/uploads/**',
			},
		],
	},
};
