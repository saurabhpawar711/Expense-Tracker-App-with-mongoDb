const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    status: {
        type: String,
    }
})

module.exports = mongoose.model('Order', orderSchema);
