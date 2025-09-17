const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        birthday: { type: Date, required: true },
        photo: { type: String }
        //listContacts: { type: String }
    },
    {
        timestamps: true 
    }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;