const fetch = require('node-fetch');
const JustEatRestaurant = require('./resources/JustEatRestaurant');

class JustEatHttpClient {
	constructor() {
		this.domain = 'https://public.je-apis.com';
		this.headers = {
			'Accept-Tenant': 'uk',
			'Accept-Language': 'en-GB',
			'Authorization': 'Basic VGVjaFRlc3Q6bkQ2NGxXVnZreDVw',
			'Host': 'public.je-apis.com'
		};
	}

	async getRestaurants (outcode) {
		const url = `${this.domain}/restaurants/?q=${outcode}`;
		try {
			const res = await fetch(url, { headers: this.headers });
			const json = await res.json();

			return json['Restaurants'].map(restaurant => new JustEatRestaurant(restaurant));
		} catch (error) {
			throw new Error(error);
		}

	}
}

module.exports = JustEatHttpClient;