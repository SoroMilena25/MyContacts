const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { 
            type: String, 
            required: true,
            minlength: 10,
            maxlength: 20,
            validate: {
                validator: function(v) {
                    return /^[0-9+\-\s]*$/.test(v);
                },
                message: props => `${props.value} n'est pas un numéro de téléphone valide!`
            }
        },
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