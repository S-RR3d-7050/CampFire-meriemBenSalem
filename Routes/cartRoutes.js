const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cartController');

// Create a new cart
router.post('/', cartController.createCart);

// Get a cart by user ID
router.get('/:userId', cartController.getCartByUser);

// Update a cart
router.put('/:id', cartController.updateCart);

// Delete a cart
router.delete('/:id', cartController.deleteCart);

// Edit quantity of a product in the cart
router.put('/edit-quantity', cartController.editQuantity);

module.exports = router;
