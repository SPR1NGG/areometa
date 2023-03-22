'use client';
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
	(error) => Promise.reject(error),
);

// $api.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const session = await getSession();

// 		const prevRequest = error?.config;
// 		if (error?.response?.status === 401 && !prevRequest?.sent) {
// 			prevRequest.sent = true;

// 			if (session?.user.refreshToken) {
// 				const res = await $api.post('/auth/refresh', {
// 					refreshToken: session.user.refreshToken,
// 				});

// 				session.user.accessToken = res.data.accessToken;
// 				session.user.refreshToken = res.data.refreshToken;
// 			}

// 			console.log(session);
// 			prevRequest.headers['Authorization'] = `Bearer ${session?.user.accessToken}`;
// 			return $api(prevRequest);
// 		}

// 		return Promise.reject(error);
// 	},
// );
