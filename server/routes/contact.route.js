const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

router.post('/api/contacts', contactController.postContact);
router.get('/api/contacts', contactController.getAllContacts);
router.get('/api/contacts/:id', contactController.getContactById);//
router.put('/api/contacts/:id', contactController.updateContact);