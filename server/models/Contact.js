const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        birthday: { type: Date, required: true },
        user_id: { type: String, required: true }
    },
    {
        timestamps: true 
    }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;