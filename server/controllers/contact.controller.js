const Contact = require('../models/contact.model');

/*
app.get('/', (req, res) => {
      res.send('Hello from our server!')
});

app.post('/api/contacts', async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (error){
        res.status(500).json({message: error.message});
    }
});

app.get('/api/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json(contact)
    } catch (error){
        res.status(500).json({message: error.message});
    } 
});

app.put('/api/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndUpdate(id, req.body);
        
        if(!contact){
            return res.statut(404).json({message: "Contact no found!"});
        }

        res.status(200).json(contact)
    } catch (error){
        res.status(500).json({message: error.message});
    } 
});*/


exports.postContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};



exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json(contact)
    } catch (error){
        res.status(500).json({message: error.message});
    } 
};



exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndUpdate(id, req.body);
        
        if(!contact){
            return res.statut(404).json({message: "Contact no found!"});
        }

        res.status(200).json(contact)
    } catch (error){
        res.status(500).json({message: error.message});
    } 
};
