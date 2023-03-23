export enum RoleEnum {
	speaker = 'speaker',
	attendee = 'attendee',
}

export interface ConferenceMember {
	role: RoleEnum;
	user_id: string;
	email?: string;
}

export default interface createConferenceDto {
	name: string;
	images: string[];
	datetime: Date;
	bannerFilename: string;
	visibility: 'public' | 'private';
	conferenceMember: ConferenceMember[];
}
