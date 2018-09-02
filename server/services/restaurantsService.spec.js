const { findRestaurants } = require('./restaurantsService');
const JustEatRestaurant = require('../justEatApi/resources/JustEatRestaurant');
const Restaurant = require('../models/Restaurant');

const mockGetRestaurants = jest.fn();
jest.mock('../justEatApi/JustEatHttpClient', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getRestaurants: mockGetRestaurants
		};
	});
});

describe('Restaurants Service', () => {
	describe('when successfully getting data from the API', () => {

		it('should return a list of restaurants', async () => {
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

			const restaurants = await findRestaurants('se19');

			expect(restaurants).toEqual([
				new Restaurant({
					name: 'Restaurant A',
					ratingAverage: 4.45,
					ratingStars: 4.4,
					cuisineTypes: [
						{ id: 1, name: 'Pizza' },
						{ id: 2, name: 'Chicken' }
					]
				}),
				new Restaurant({
					name: 'Restaurant B',
					ratingAverage: 5.25,
					ratingStars: 5.2,
					cuisineTypes: [
						{ id: 3, name: 'Pasta' },
						{ id: 4, name: 'Tacos' }
					]
				})
			]);
		});
	});

	describe('when there was an error getting data from the API', () => {
		it('should throw an error', () => {
			mockGetRestaurants.mockImplementation(() => {
				throw new Error('fake error message');
			});
			expect(findRestaurants('se19')).rejects.toEqual(new Error('fake error message'));
		});
	});
});