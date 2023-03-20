export default interface GetConferencesQuery {
	offset?: string;
	limit?: string;
	visibility?: 'public' | 'private';
	datetime?: 'today' | 'tomorrow' | 'past';
}
