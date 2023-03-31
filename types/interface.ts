export default interface User {
	id: string;
	email: string;
	accessToken: string;
	refreshToken: string;
	role: 'user' | 'admin';
}
