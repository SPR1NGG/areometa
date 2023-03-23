import { $api } from 'api';
import createConferenceDto from 'api/types/createConferenceDto';
import GetConferences from 'api/types/getConferences';
import GetConferencesQuery from 'api/types/getConferences.query';
import { AxiosResponse } from 'axios';

export default class ConferenceService {
	static async create({
		name,
		images,
		datetime,
		visibility,
		conferenceMember,
		bannerFilename,
	}: createConferenceDto) {
		return $api.post(`/conferences`, {
			name,
			datetime: datetime,
			visibility: visibility,
			banner_filename: bannerFilename,
			media_file: images.map((img) => ({ filename: img })),
			conference_member: conferenceMember.map(({ email, ...user }) => user),
		});
	}

	static async get(query?: GetConferencesQuery): Promise<AxiosResponse<GetConferences>> {
		return $api.get('/conferences', {
			params: query,
		});
	}

	static async remove(id: string) {
		await $api.delete(`/conferences/${id}`);
	}

	static async uploadImages(images: File[]) {
		const formData = new FormData();

		images.map((img) => {
			formData.append('files', img, img.name);
		});

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		return await $api.post<string[]>(`/file/upload`, formData, config);
	}
}
