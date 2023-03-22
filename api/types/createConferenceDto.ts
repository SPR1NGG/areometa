export default interface createConferenceDto {
	name: string;
	images: string[];
	token: string | undefined;
	datetime: Date;
	visibility: 'public' | 'private';
}
