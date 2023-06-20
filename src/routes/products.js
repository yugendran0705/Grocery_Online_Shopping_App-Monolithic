const express = require('express');
const router = express.Router();
const {
    createProduct,
    byCatogery,
    byId,
    manyById,
    addToWishlist,
    deleteFromWishlist,
    addToCart,
    deleteFromCart,
    getProducts
} = require('../controllers/products');
const { verifyToken } = require('../middlewares/auth');

router.post('/create', verifyToken, createProduct);
router.post('/ids', manyById);

router.get('/:type', byCatogery);
router.get('/:_id', byId);
router.get('/', getProducts);

router.put('/wishlist', verifyToken, addToWishlist);
router.put('/cart', verifyToken, addToCart);

router.delete('/wishlist/:id', verifyToken, deleteFromWishlist);
router.delete('/cart/:id', verifyToken, deleteFromCart);

module.exports = router;