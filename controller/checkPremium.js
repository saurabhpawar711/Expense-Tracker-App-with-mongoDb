
exports.premiumStatus = async (req, res, next) => {
    try {
        const premiumUser = req.user.isPremiumUser;
        if(premiumUser) {
            res.status(200).json({isPremium: true});
        }
        else {
            throw new Error('Premium membership required');
        }
    }
    catch(err) {
        if (err.message === 'Premium membership required') {
            res.status(403).json({ success: false, error: err.message });
        }
    }
}