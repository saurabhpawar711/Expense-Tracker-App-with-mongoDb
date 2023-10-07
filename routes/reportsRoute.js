const express = require('express');

const router = express.Router();

const reports = require('../controller/reportsController');

const authenticateRoute = require('../middleware/authenticate');

router.post('/reports/dailyReports', authenticateRoute.authenticateUser, reports.getDailyReports);

router.post('/reports/monthlyReports', authenticateRoute.authenticateUser, reports.getMonthlyReports);

module.exports = router;