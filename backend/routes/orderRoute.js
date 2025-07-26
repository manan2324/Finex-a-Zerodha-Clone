const router = require('express').Router();
const { newOrder, allOrders, deleteAllOrders } = require('../controllers/orderController');

router.post('/newOrder', newOrder);
router.get('/allOrders/:userId', allOrders);
router.delete('/allOrders/:userId', deleteAllOrders);

module.exports = router;