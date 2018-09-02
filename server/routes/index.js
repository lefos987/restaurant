const express = require('express');
const router = express.Router();

// Home Page route
router.get('/', (req, res) => {
	res.render('index');
});

module.exports = router;