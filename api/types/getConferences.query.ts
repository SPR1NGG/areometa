export default interface GetConferencesQuery {
	offset?: number;
	limit?: number;
	visibility?: 'public' | 'private';
	datetime?: 'today' | 'tomorrow' | 'past';
}
