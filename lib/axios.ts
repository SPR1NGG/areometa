import axios from 'axios';
const BASE_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3172'
		: 'https://aresmeta-back.sqkrv.com';
export default axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
});

export const axiosAuth = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
});
