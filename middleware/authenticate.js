const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, 'secretkey');
        const foundUser = await User.findById(user.userId)
        req.user = foundUser;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({success: false, error: 'error while authenticating user'});
    }
}