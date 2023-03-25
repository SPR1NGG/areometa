import { AxiosResponse } from 'axios';
import $api from 'api';
import userByEmail from './types/userByEmail.interface';
import RegisterInterface from './types/register.interface';

export default class UserService {
	static async register(data: RegisterInterface) {
		await $api.post('/auth/register', {
			email: data.email,
			password: data.password,
			name: data.name,
		});
	}

	static async sendResetEmail(email: string) {
		await $api.post(`/auth/reset/${email}`);
	}

	static async reset(token: string, newPass: string) {
		await $api.post(`/auth/reset?token=${token}`, {
			newPass,
		});
	}

	static async userByEmail(email: string): Promise<AxiosResponse<userByEmail>> {
		return await $api.get(`/users/${email}`);
	}
}
