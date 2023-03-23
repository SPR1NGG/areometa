import axios from 'axios';
import { BASE_URL } from 'lib/axios';
import { getSession } from 'next-auth/react';

export const $api = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
});

$api.interceptors.request.use(
	async (config) => {
		const session = await getSession();

		if (!config.headers['Authorization']) {
			config.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
