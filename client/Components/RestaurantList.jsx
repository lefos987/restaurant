import { h, Component } from 'preact';

export default class RestaurantList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { restaurants } = this.props;
		const restaurantList = restaurants.map((restaurant, index) => (
			<li key={`restaurant-${index}`}>
				<h3>{restaurant.name}</h3>
				<p>Rating: {restaurant.ratingAverage}</p>
				<div>
					<span>Cuisines: </span>
					{
						restaurant.cuisineTypes.map(cuisineType => <i>{cuisineType.name}, </i>)
					}
				</div>
			</li>
		));

		return restaurants.length > 0 ?
			<div className="restaurant-list">
				<p>We found some amazing restaurants in your area. Get ready to order!</p>
				<ul>
					{restaurantList}
				</ul>
			</div> : <p>No restaurants found in this area.</p>;
	}
}