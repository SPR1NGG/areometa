import $api from 'api';
import { AxiosResponse } from 'axios';
import createDto from './types/createDto';
import Get from './types/get';
import ShowroomQuery from './types/ShowroomQuery';

export default class ShowroomService {
	static async create(create: createDto) {
		return await $api.post(`/showroom`, create);
	}

	static async update(update: createDto, id: string) {
		return await $api.patch(`/showroom/${id}`, update);
	}

	static async get(query?: ShowroomQuery): Promise<AxiosResponse<Get>> {
		return $api.get('/showroom', {
			params: query,
		});
	}

	static async remove(id: string) {
		await $api.delete(`/showroom/${id}`);
	}

	static async uploadVideo(img: File) {
		const formData = new FormData();

		formData.append('files', img, img.name);

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		return await $api.post<string[]>(`/file/upload`, formData, config);
	}
}
