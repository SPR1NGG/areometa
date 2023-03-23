import IConference from 'types/conference.interface';

export default interface GetConferences {
	conferences: IConference[];
	total: number;
}
