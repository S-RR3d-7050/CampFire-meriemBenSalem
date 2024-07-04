const Cart = require('../Model/Cart');
const Product = require('../Model/produit'); // Ensure the correct path to the Product model

// Create a new cart
exports.createCart = async (req, res) => {
    try {
        const cart = new Cart({
            user: req.body.user,
            cart: req.body.cart
        });
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a cart by user ID
exports.getCartByUser = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('cart.product');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a cart
exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('cart.product');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a cart
exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit quantity of a product in the cart
exports.editQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await Cart.findOne({ user: userId }).populate('cart.product');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        
        const productIndex = cart.cart.findIndex(item => item.product._id.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }
        
        cart.cart[productIndex].quantity = quantity;
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
