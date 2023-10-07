const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userData = new User({
            name: name,
            email: email,
            password: hashedPassword
        })
        await userData.save();
        res.status(201).json({ userDetails: userData, success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'User already exists' });
    }
}

function generateToken(id) {
    return jwt.sign({ userId: id }, 'secretkey')
}

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ 'email': email });
        if (!user) {
            throw new Error('Invalid user');
        }
        else {
            const passwordMatched = await bcrypt.compare(password, user.password);
            if (passwordMatched) {
                res.status(202).json({ success: true, message: "User logged in successfully", token: generateToken(user._id) });
            }
            else {
                throw new Error('Incorrect password');
            }
        }
    }
    catch (err) {
        console.log(err);
        if (err.message === 'Invalid user') {
            res.status(404).json({ success: false, error: err.message });
        } else if (err.message === 'Incorrect password') {
            res.status(401).json({ success: false, error: err.message });
        } else {
            res.status(500).json({ success: false, error: 'Something went wrong' });
        }
    }
};

