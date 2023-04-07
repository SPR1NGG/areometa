import { MediaFile } from 'types/conference.interface';
import { ConferenceMember } from './createConferenceDto';

export default interface updateDto {
	name: string;
	images: ({ filename: string } | MediaFile)[];
	datetime: Date;
	bannerFilename: string;
	visibility: 'public' | 'private';
	conferenceMember: ConferenceMember[];
	mediaType: string;
}
