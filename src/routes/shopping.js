const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrderDetails,
    getCartDetails
} = require('../controllers/shopping');
const { verifyToken } = require('../middlewares/auth');

router.post('/order', verifyToken, createOrder);

router.get('/orders', verifyToken, getOrderDetails);
router.get('/cart', verifyToken, getCartDetails);

module.exports = router;