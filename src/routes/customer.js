const express = require('express');
const router = express.Router();
const {
    signup,
    signin,
    addNewAddress,
    getCustomer,
    getCustomerOrders,
    getCustomerWishlist
} = require('../controllers/customer');
const { verifyToken } = require('../middlewares/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/address', verifyToken, addNewAddress);

router.get('/profile', verifyToken, getCustomer);
router.get('/shoppingdetails', verifyToken, getCustomerOrders);
router.get('/wishlist', verifyToken, getCustomerWishlist);

module.exports = router;