const User = require('../models/user');

exports.getLeaderboardDetails = async (req, res) => {
    try {
        const limit = 10;
        const page = req.params.page;
        const offset = (page - 1) * limit;

        const totalNoofUsers = await User.countDocuments();
        const totalPage = Math.ceil(totalNoofUsers / limit);

        const users = await User.find()
            .select('id name totalExpense')
            .skip(offset)
            .limit(limit)
            .sort({totalExpense: -1})
        const currentPage = parseInt(page, 10); 
        const nextPage = currentPage + 1;
        const previousPage = currentPage - 1;

        const otherData = {
            currentPage: page,
            hasNextPage: limit * page < totalNoofUsers,
            nextPage: nextPage,
            hasPreviousPage: page > 1,
            previousPage: previousPage,
            lastPage: totalPage
        };
        res.status(201).json({ users: users, data: otherData });
    }

    catch (err) {
        res.status(500).json({error: "Something went wrong during showing expenses"});
    }
}