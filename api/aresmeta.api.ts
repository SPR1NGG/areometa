'use client';
import axios from 'lib/axios';

class AresmetaApi {
	private base_url: string;
	constructor() {
		this.base_url =
			process.env.NODE_ENV === 'development'
				? 'http://localhost:3172'
				: 'https://aresmeta-back.sqkrv.com';
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
		token: string | undefined;
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

	async uploadImages(images: File[], accessToken: string | undefined) {
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

		return await axios.post<string[]>(`/file/upload`, formData, config);
	}
}

export default new AresmetaApi();
