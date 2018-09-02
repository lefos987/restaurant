class RestaurantCuisineType {
	constructor(cuisineType = {}) {
		this.id = cuisineType.Id || null;
		this.name = cuisineType.Name || '';
	}
}

module.exports = RestaurantCuisineType;