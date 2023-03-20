import axios from 'axios';
import GetConferencesQuery from './types/getConferences.query';

class AresmetaApi {
	private base_url: string;
	constructor() {
		// this.base_url = 'https://aresmeta-back.sqkrv.com';
		this.base_url = 'http://localhost:3172';
	}

	async createConference({
		token,
		name,
		images,
		datetime,
		visibility,
	}: {
		name: string;
		images: string[];
		token: string;
		datetime: Date;
		visibility: 'public' | 'private';
	}) {
		await fetch(`${this.base_url}/conferences`, {
			method: 'POST',
			cache: 'no-store',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				name,
				datetime: datetime,
				visibility: visibility,
				media_file: images.map((img) => ({ filename: img })),
			}),
		});
	}

	async removeConference({ token, id }: { token: string; id: string }) {
		await fetch(`${this.base_url}/conferences/${id}`, {
			method: 'DELETE',
			cache: 'no-store',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	async sendResetEmail(email: string) {
		await fetch(this.base_url + `/auth/reset/${email}`, {
			method: 'POST',
			cache: 'no-store',
		});
	}

	async reset(token: string, newPass: string) {
		await fetch(this.base_url + `/auth/reset?token=${token}`, {
			method: 'POST',
			cache: 'no-store',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				newPass,
			}),
		});
	}

	async uploadImages(images: File[], accessToken: string) {
		const formData = new FormData();

		images.map((img) => {
			formData.append('files', img, img.name);
		});

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
				Authorization: `Bearer ${accessToken}`,
			},
		};
		return await axios.post<string[]>(`${this.base_url}/file/upload`, formData, config);
	}

	async getConferences(query?: GetConferencesQuery) {
		return await (
			await fetch(`${this.base_url}/conferences?${new URLSearchParams(query as string)}`, {
				cache: 'no-store',
			})
		).json();
	}
}

export default new AresmetaApi();
