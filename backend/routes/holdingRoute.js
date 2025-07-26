const router = require('express').Router();
const { allHoldings, userHoldings } = require('../controllers/holdingController');

router.get('/allHoldings', allHoldings);
router.get('/userHoldings/:userId', userHoldings);

module.exports = router;