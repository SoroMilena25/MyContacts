const Contact = require('../models/Contact');

//CREATE contact
exports.postContact = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const contact = await Contact.create({
      ...req.body,
      user_id: req.user.userId,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//GET tous les contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};


//GET un contact
exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json(contact)
    } catch (error){
        res.status(500).json({message: error.message});
    } 
};

//PATCH
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

//DELETE
exports.deleteContact = async (req, res) => {
    try{
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({ message: "Contact not found!" });
        }

        res.status(200).json({ message: "Contact deleted successfully!" });
    } catch (error){
        res.status(500).json({message: error.message});
    }
};


//GET contact by user_id
exports.getContactsByUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const contacts = await Contact.find({ user_id: userId });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};