'use client';
import { $api } from 'api';
import axios, { BASE_URL } from 'lib/axios';
import createConferenceDto from './types/createConferenceDto';
import GetConferencesQuery from './types/getConferences.query';

const base_url = BASE_URL;

export default class AresmetaApi {
	static async createConference({ name, images, datetime, visibility }: createConferenceDto) {
		return $api.post(`/conferences`, {
			name,
			datetime: datetime,
			visibility: visibility,
			media_file: images.map((img) => ({ filename: img })),
		});
	}

	static async getConferences(query?: GetConferencesQuery) {
		return $api.get('/conferences', {
			params: query,
		});
	}

	static async removeConference(id: string) {
		await $api.delete(`/conferences/${id}`);
	}

	static async sendResetEmail(email: string) {
		await fetch(base_url + `/auth/reset/${email}`, {
			method: 'POST',
			cache: 'no-store',
		});
	}

	static async reset(token: string, newPass: string) {
		await fetch(base_url + `/auth/reset?token=${token}`, {
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

	static async uploadImages(images: File[], accessToken: string | undefined) {
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
