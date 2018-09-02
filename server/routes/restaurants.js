const express = require('express');
const router = express.Router();
const { findRestaurants } = require('../services/restaurantsService');

// Restaurants route
router.get('/', async (req, res, next) => {
	if (!req.query.outcode) {
		res.status(400).json({ error: 'Please provide the outcode' });
	} else {
		try {
			const restaurants = await findRestaurants(req.query.outcode);
			res.setHeader('Content-Type', 'application/json');
			res.json(restaurants);
		} catch (error) {
			next(error);
		}
	}
});

module.exports = router;