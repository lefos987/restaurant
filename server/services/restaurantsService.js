const JustEatHttpClient = require('../justEatApi/JustEatHttpClient');
const Restaurant = require('../models/Restaurant');

const findRestaurants = async outcode => {
	const justEatHttpClient = new JustEatHttpClient();
	try {
		const restaurantsFromApi = await justEatHttpClient.getRestaurants(outcode);
		return restaurantsFromApi.map(restaurantFromApi => new Restaurant(restaurantFromApi));
	} catch (error) {
		throw error;
	}
};

module.exports = {
	findRestaurants
};
