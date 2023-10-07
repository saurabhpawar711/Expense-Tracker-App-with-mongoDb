const express = require('express');

const router = express.Router();

const orderRoute = require('../controller/order');

const authenticateRoute = require('../middleware/authenticate');

router.get('/premium/buy-premium', authenticateRoute.authenticateUser, orderRoute.buyPremium);

router.post('/premium/update-status', authenticateRoute.authenticateUser, orderRoute.updateStatus);

router.get('/premium/premium-status', authenticateRoute.authenticateUser, orderRoute.premiumStatus);

module.exports = router;