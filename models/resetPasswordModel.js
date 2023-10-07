const mongoose = require('mongoose')

const ResetPasswordSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('ResetPassword', ResetPasswordSchema);