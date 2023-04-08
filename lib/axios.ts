import axios from 'axios';
export const BASE_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3172/aresapi'
		: process.env.NEXT_PUBLIC_API_URL;

export default axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
});

export const UPLOAD_URL = `${BASE_URL}/uploads/`;

export const axiosAuth = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
});
