class Restaurant {
	constructor(restaurant = {}) {
		this.name = restaurant.name || '';
		this.ratingAverage = restaurant.ratingAverage || 0;
		this.ratingStars = restaurant.ratingStars || 0;
		this.cuisineTypes = restaurant.cuisineTypes || [];
	}
}

module.exports = Restaurant;