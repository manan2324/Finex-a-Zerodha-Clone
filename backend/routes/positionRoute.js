const router = require('express').Router();
const { allPositions } = require('../controllers/positionController');

router.get('/allPositions', allPositions);

module.exports = router;