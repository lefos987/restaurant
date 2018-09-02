const Restaurant = require('./Restaurant');

describe('Restaurant model', () => {
	describe('property: Name', () => {
		it('should be defined', () => {
			const restaurant = new Restaurant({ name: 'abc' });
			expect(restaurant.name).toEqual('abc');
		});

		it('should have a default value of an empty string', () => {
			const restaurant = new Restaurant();
			expect(restaurant.name).toEqual('');
		});
	});

	describe('property: Rating Average', () => {
		it('should be defined', () => {
			const restaurant = new Restaurant({ ratingAverage: 123 });
			expect(restaurant.ratingAverage).toEqual(123);
		});

		it('should have a default value of 0', () => {
			const restaurant = new Restaurant();
			expect(restaurant.ratingAverage).toEqual(0);
		});
	});

	describe('property: Rating Stars', () => {
		it('should be defined', () => {
			const restaurant = new Restaurant({ ratingStars: 123 });
			expect(restaurant.ratingStars).toEqual(123);
		});

		it('should have a default value of 0', () => {
			const restaurant = new Restaurant();
			expect(restaurant.ratingStars).toEqual(0);
		});
	});

	describe('property: Cuisine Types', () => {
		it('should be defined', () => {
			const restaurant = new Restaurant({ cuisineTypes: [1, 2, 3] });
			expect(restaurant.cuisineTypes).toEqual([1, 2, 3]);
		});

		it('should have a default value of an empty array', () => {
			const restaurant = new Restaurant();
			expect(restaurant.cuisineTypes).toEqual([]);
		});
	});
});