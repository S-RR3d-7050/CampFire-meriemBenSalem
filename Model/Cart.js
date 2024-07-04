const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'produit'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});

CartSchema.virtual('totalPrice').get(function () {
    return this.cart.reduce((total, item) => {
        return total + (item.product.prixProduit * item.quantity);
    }, 0);
});

CartSchema.set('toJSON', { virtuals: true });
CartSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Cart', CartSchema);
