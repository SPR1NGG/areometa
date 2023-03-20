import axios from 'axios';

class AresmetaAPI {
	private base_url: string;
	constructor() {
		this.base_url = 'https://aresmeta-back.sqkrv.com';
		// this.base_url = 'http://localhost:3172';
	}

	async createConference({
		token,
		name,
		images,
	}: {
		name: string;
		images: string[];
		token: string;
	}) {
		await fetch(`${this.base_url}/conferences`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				name,
				datetime: '2020-03-19T14:21:00+02:00',
				visibility: 'public',
				media_file: images.map((img) => ({ filename: img })),
			}),
		});
	}

	async removeConference({ token, id }: { token: string; id: string }) {
		await fetch(`${this.base_url}/conferences/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	async sendResetEmail(email: string) {
		await fetch(this.base_url + `/auth/reset/${email}`, {
			method: 'POST',
		});
	}

	async reset(token: string, newPass: string) {
		await fetch(this.base_url + `/auth/reset?token=${token}`, {
			method: 'POST',
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

	async getConferences() {
		return await (await fetch('https://aresmeta-back.sqkrv.com/conferences')).json();
	}
}

export default new AresmetaAPI();
