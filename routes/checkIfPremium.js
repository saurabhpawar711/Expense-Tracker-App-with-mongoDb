
const express = require('express');

const router = express.Router();

const isPremiumRoute = require('../controller/checkPremium');

const authenticateRoute = require('../middleware/authenticate');

router.get('/premium/check-premium', authenticateRoute.authenticateUser, isPremiumRoute.premiumStatus);

module.exports = router;