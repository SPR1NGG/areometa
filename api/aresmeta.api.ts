class AresmetaAPI {
	private base_url: string;
	constructor() {
		// this.base_url = 'https://aresmeta-back.sqkrv.com';
		this.base_url = 'http://localhost:3172';
	}

	async sendResetEmail(email: string) {
		await fetch(this.base_url + `/auth/reset/${email}`, {
			method: 'POST',
		});
	}

	async reset(token: string, newPass: string) {
		await fetch(this.base_url + `/auth/reset?token=${token}`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				newPass,
			}),
		});
	}

	async getConferences() {
		return await (await fetch('https://aresmeta-back.sqkrv.com/conferences')).json();
	}
}

export default new AresmetaAPI();
