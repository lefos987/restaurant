import { h, Component } from 'preact';
import RestaurantList from './RestaurantList.jsx';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			error: null,
			hasPerformedSearch: false,
			outcode: '',
			restaurants: []
		};
		this.handleOutcodeChange = this.handleOutcodeChange.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
	}

	handleSearchClick() {
		window.fetch(`/restaurants/?outcode=${this.state.outcode}`)
			.then(res => {
				if (!res.ok) {
					this.setState({ error: 'Oops! Something went wrong!' });
					throw new Error(res.statusText);
				} else{
					this.setState({ error: null });
					return res.json();
				}
			})
			.then(restaurants => {
				this.setState({
					hasPerformedSearch: true,
					restaurants
				});
			})
			.catch(err => {
				console.log('err', err);
			});
	}

	handleOutcodeChange(event) {
		this.setState({ outcode: event.target.value });
	}

	render() {
		return (
			<div className="main">
				<h2>Find a restaurant close to you!</h2>
				<div className="search-container">
					<input type="text"
						   placeholder="Type your outcode..."
						   onChange={this.handleOutcodeChange}
						   value={this.state.outcode}/>
					<button onClick={this.handleSearchClick}>Search</button>
				</div>
				{
					this.state.hasPerformedSearch && !this.state.error ?
						<RestaurantList restaurants={this.state.restaurants}/> :
						<span/>
				}
				{
					this.state.error ?
						<p className="error">{this.state.error}</p> :
						<span/>
				}
			</div>
		);
	}
}
