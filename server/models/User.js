const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        mdp: { type: String, required: true },
        pseudo: { type: String, required: true }
    },
    {
        timestamps: true 
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;