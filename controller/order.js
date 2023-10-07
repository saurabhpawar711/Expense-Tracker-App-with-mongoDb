const Razorpay = require('razorpay');
const Order = require('../models/orders');
const User = require('../models/user');

exports.buyPremium = async (req, res, next) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY
        });
        const amount = 19900;
        const order = await new Promise((resolve, reject) => {
            rzp.orders.create({ amount, currency: 'INR' }, (err, order) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(order)
                }
            })
        })
        const orderData = new Order({
            orderId: order.id,
            status: 'PENDING'
        })
        await orderData.save();
        return res.status(201).json({ order, key_id: rzp.key_id })
    }
    catch (err) {
        res.status(403).json({ message: "Something went wrong", error: err });
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const { payment_id, order_id, status } = req.body;
        const userId = req.user._id;
        const order = await Order.findOne({ 'orderId': order_id });
        if (order) {
            if (status === "FAILED") {
                await Order.updateOne({ 'orderId': order_id }, { $set: { 'paymentId': null, 'status': "FAILED" } });
            }
            else if (status === "SUCCESSFUL") {
                const promise1 = Order.updateOne({ 'orderId': order_id }, { $set: { 'paymentId': payment_id, 'status': status } });
                const promise2 = User.updateOne({ '_id': userId }, { $set: { 'isPremiumUser': true } });
                await Promise.all([promise1, promise2]);
                return res.status(202).json({ message: "Payment Successful", success: true });
            }
        }
    }
    catch (err) {
        res.status(403).json({ error: "Something went wrong" });
    }
}

exports.premiumStatus = async (req, res, next) => {
    try {
        const premiumUser = req.user.isPremiumUser;
        return res.json({ premiumUser });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
}