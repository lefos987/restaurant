const JustEatCuisineType = require('./JustEatCuisineType');

class JustEatRestaurant {
	constructor(restaurant = {}) {
		this.name = restaurant.Name || '';
		this.ratingAverage = restaurant.RatingAverage || 0;
		this.ratingStars = restaurant.RatingStars || 0;
		this.cuisineTypes = restaurant.CuisineTypes &&
            restaurant.CuisineTypes.map(cuisineType => new JustEatCuisineType(cuisineType)) || [];
	}
}

module.exports = JustEatRestaurant;