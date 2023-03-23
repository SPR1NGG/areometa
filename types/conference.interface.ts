export interface MediaFile {
	id: string;
	conference_id: string;
	filename: string;
}

export default interface IConference {
	id: string;
	name: string;
	datetime: string;
	visibility: 'public' | 'private';
	banner_filename: string;
	creator: string;
	user: {
		name: string;
	};
	media_file: MediaFile[];
	conference_member: [[Object]];
}
