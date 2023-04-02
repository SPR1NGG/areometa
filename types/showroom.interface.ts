export default interface IShowroom {
	id: string;
	name?: string;
	filename?: string;
	url?: string;
	added: Date;
	user: {
		id: string
		name: string;
	};
}
