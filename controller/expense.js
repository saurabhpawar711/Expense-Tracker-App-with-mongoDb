const Expense = require('../models/expenses');
const User = require('../models/user');
const S3Services = require('../services/S3service');

exports.addExpense = async (req, res, next) => {
    try {
        const date = req.body.date;
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;
        const userId = req.user.id;

        const expenseData = new Expense({
            date: date,
            amount: amount,
            description: description,
            category: category,
            userId: userId
        })
        const totalAmount = Number(req.user.totalExpense) + Number(amount);
        promise1 = expenseData.save();
        promise2 = User.updateOne({ '_id': userId, }, { $set: { 'totalExpense': totalAmount } })
        Promise.all([promise1, promise2]);
        res.status(201).json({ expenseDetails: expenseData });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.deleteExpense = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user._id;
        const expense = await Expense.findById(id);
        const updatedAmount = req.user.totalExpense - expense.amount;
        const promise1 = User.updateOne({ '_id': userId }, { $set: { 'totalExpense': updatedAmount } });
        const promise2 = Expense.deleteOne({ '_id': id });
        await Promise.all([promise1, promise2]);
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

exports.downloadExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.findAll({ where: { userId: req.user.id } });
        const stringifiedExpenses = JSON.stringify(expenses);
        const fileName = `Expense${userId}/${new Date()}.txt`;
        const fileUrl = await S3Services.uploadToS3(stringifiedExpenses, fileName);
        res.status(200).json({ fileUrl, success: true });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getExpenseDetails = async (req, res) => {

    try {
        const userId = req.user.id;
        const limit = parseInt(req.body.expensePerPage, 10);
        const page = req.params.page;
        const offset = (page - 1) * limit;

        const totalNoofExpense = await Expense.countDocuments({ userId });
        const totalPage = Math.ceil(totalNoofExpense / limit);
        const expense = await Expense.find({ userId })
            .skip(offset)
            .limit(limit)
        const currentPage = parseInt(page, 10);
        const nextPage = currentPage + 1;
        const previousPage = currentPage - 1;

        const otherData = {
            currentPage: page,
            hasNextPage: limit * page < totalNoofExpense,
            nextPage: nextPage,
            hasPreviousPage: page > 1,
            previousPage: previousPage,
            lastPage: totalPage
        };
        res.status(201).json({ expense: expense, data: otherData });
    }

    catch (err) {
        res.status(500).json({ error: err });
    }
}