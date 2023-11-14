const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/orders/cart
router.get('/cart', ordersCtrl.cart);
// POST /api/orders/cart/items/:id
router.post('/cart/vehicles/:id', ordersCtrl.addToCart);
// POST /api/orders/cart/checkout
router.post('/create-checkout-session/:orderId', ordersCtrl.checkout);
// POST /api/orders/cart/qty
router.put('/cart/qty', ordersCtrl.setItemQtyInCart);

router.post("/pesapal/authenticate",ordersCtrl.authenticatePesapal )
router.post("/initiateMpesaPayment",ordersCtrl.initiateMpesaPayment )
// ,ordersCtrl.postStk

module.exports = router;
// https://cybqa.pesapal.com/pesapalv3