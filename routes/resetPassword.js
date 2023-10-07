const express = require('express');

const router = express.Router();

const passwordRoute = require('../controller/resetPwd');

router.post('/password/forgotpassword', passwordRoute.sendEmail);

router.get(`/password/checkRequest/:uuid`, passwordRoute.checkRequest);

router.post('/password/updatepassword/:userId', passwordRoute.updatePassword);

module.exports = router;