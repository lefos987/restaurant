const JustEatHttpClient = require('./JustEatHttpClient');
const JustEatRestaurant = require('./resources/JustEatRestaurant');

describe('JustEat Http Client', () => {
	it('should have the correct domain', () => {
		const justEatHttpClient = new JustEatHttpClient();
		expect(justEatHttpClient.domain).toEqual('https://public.je-apis.com');
	});

	it('should have the correct headers', () => {
		const justEatHttpClient = new JustEatHttpClient();
		expect(justEatHttpClient.headers).toEqual({
			'Accept-Tenant': 'uk',
			'Accept-Language': 'en-GB',
			'Authorization': 'Basic VGVjaFRlc3Q6bkQ2NGxXVnZreDVw',
			'Host': 'public.je-apis.com'
		});
	});

	describe('when getting the restaurants from the JustEat API', () => {
		beforeEach(() => {
			fetch.resetMocks();
		});

		const mockResponse = {
			Restaurants: [
				{
					Name: 'Restaurant A',
					RatingAverage: 4.45,
					RatingStars: 4.4,
					CuisineTypes: [
						{ Id: 1, Name: 'Pizza' },
						{ Id: 2, Name: 'Chicken' }
					]
				},
				{
					Name: 'Restaurant B',
					RatingAverage: 5.25,
					RatingStars: 5.2,
					CuisineTypes: [
						{ Id: 3, Name: 'Pasta' },
						{ Id: 4, Name: 'Tacos' }
					]
				}
			]
		};

		it('should call the correct endpoint to get the restaurants', () => {
			const justEatHttpClient = new JustEatHttpClient();
			fetch.mockResponseOnce(JSON.stringify(mockResponse));
			justEatHttpClient.getRestaurants('se19');
			expect(fetch.mock.calls[0][0]).toEqual('https://public.je-apis.com/restaurants/?q=se19');
		});

		describe('when the endpoint returns data successfully', () => {
			it('should return an array of JustEat Restaurants', () => {
				const justEatHttpClient = new JustEatHttpClient();
				fetch.mockResponseOnce(JSON.stringify(mockResponse));
				justEatHttpClient.getRestaurants()
					.then(data => expect(data).toEqual([
						new JustEatRestaurant(mockResponse['Restaurants'][0]),
						new JustEatRestaurant(mockResponse['Restaurants'][1])
					]));
			});
		});

		describe('when the endpoint fails to return data', () => {
			it('should throw a new error', () => {
				const justEatHttpClient = new JustEatHttpClient();
				fetch.mockReject('fake error message');
				expect(justEatHttpClient.getRestaurants()).rejects.toEqual(new Error('fake error message'));
			});
		});
	});
});