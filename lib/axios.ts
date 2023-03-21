import axios from 'axios';
// const BASE_URL = 'http://localhost:3172';
const BASE_URL = 'https://aresmeta-back.sqkrv.com';
export default axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
});

export const axiosAuth = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
});
