import { $api } from 'api';
import userByEmail from 'api/types/userByEmail.interface';
import { AxiosResponse } from 'axios';

export default class UserService {
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
