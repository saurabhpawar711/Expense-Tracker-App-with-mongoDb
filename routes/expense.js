const express = require('express');

const router = express.Router();

const expenseRoute = require('../controller/expense');

const authenticateRoute = require('../middleware/authenticate');

const isPremiumRoute = require('../middleware/isPremium');

router.post('/expense/add-expenses', authenticateRoute.authenticateUser, expenseRoute.addExpense);

router.delete('/expense/delete-expenses/:id', authenticateRoute.authenticateUser, expenseRoute.deleteExpense);

router.get('/user/download', authenticateRoute.authenticateUser, isPremiumRoute.premiumStatus, expenseRoute.downloadExpense);

router.post('/expense/getDetails/:page', authenticateRoute.authenticateUser, expenseRoute.getExpenseDetails);

module.exports = router;