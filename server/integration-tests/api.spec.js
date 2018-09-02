const request = require('supertest');
const app = require('../index');
const JustEatRestaurant = require('../justEatApi/resources/JustEatRestaurant');

const mockGetRestaurants = jest.fn();
jest.mock('../justEatApi/JustEatHttpClient', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getRestaurants: mockGetRestaurants
		};
	});
});

mockGetRestaurants.mockReturnValue([
	new JustEatRestaurant({
		Name: 'Restaurant A',
		RatingAverage: 4.45,
		RatingStars: 4.4,
		CuisineTypes: [
			{ Id: 1, Name: 'Pizza' },
			{ Id: 2, Name: 'Chicken' }
		]
	}),
	new JustEatRestaurant({
		Name: 'Restaurant B',
		RatingAverage: 5.25,
		RatingStars: 5.2,
		CuisineTypes: [
			{ Id: 3, Name: 'Pasta' },
			{ Id: 4, Name: 'Tacos' }
		]
	})
]);

describe('API Routes', () => {
	describe('Root route', () => {
		it('should respond successfully to the GET method', async () => {
			const response = await request(app).get('/');
			expect(response.statusCode).toBe(200);
		});
	});

	describe('Restaurants route', () => {
		it('should respond with 400 when no outcode is provided', async () => {
			const response = await request(app).get('/restaurants');
			expect(response.statusCode).toBe(400);
			expect(response.body).toEqual({ error: 'Please provide the outcode' });
		});

		it('should respond with 200 when an outcode is provided', async () => {
			const response = await request(app).get('/restaurants?outcode=se19');
			expect(response.statusCode).toBe(200);
		});

		it('should respond with the restaurants that are in the area', async () => {
			const response = await request(app).get('/restaurants?outcode=se19');
			expect(response.body.length).toBe(2);
			expect(response.body[0].name).toEqual('Restaurant A');
			expect(response.body[1].name).toEqual('Restaurant B');
		});

		it('should respond with an empty array if no restaurants are found in the area', async () => {
			mockGetRestaurants.mockReturnValue([]);
			const response = await request(app).get('/restaurants?outcode=se19');
			expect(response.body).toEqual([]);
		});

		it('should respond with 500 if an error was thrown', async () => {
			global.console = { error: jest.fn() };
			mockGetRestaurants.mockImplementation(() => { throw new Error('fake error message'); });
			const response = await request(app).get('/restaurants?outcode=se19');
			expect(response.statusCode).toBe(500);
		});
	});
});