const Expense = require('../models/expenses');

exports.getDailyReports = async (req, res) => {
    try {
        const date = req.body.date;
        const userId = req.user._id;
        const data = await Expense.find({
            'date': date,
            'userId': userId
        });
        res.status(200).json({ data: data, success: true });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.getMonthlyReports = async (req, res) => {
    try {
        const { month } = req.body;
        const userId = req.user.id;

        const data = await Expense.find({
            'date': {
                $regex: `.*\/${month}\/.*`
            },
            userId: userId
        });
        res.status(200).json({ data: data, success: true });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}