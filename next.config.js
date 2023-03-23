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
				pathname: '/uploads/**',
			},
			{
				hostname: 'aresmeta-back.sqkrv.com',
				protocol: 'https',
				pathname: '/uploads/**',
			},
		],
	},
};
