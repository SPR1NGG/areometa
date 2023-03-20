export default interface IConference {
	id: string;
	name: string;
	datetime: string;
	visibility: 'public' | 'private';
	banner_filename: string;
	creator: string;
	media_file: [[Object], [Object]];
	conference_member: [[Object]];
}
