const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactController.js');
const requireAuth = require('../config/requireAuth.js');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - phone
 *         - email
 *         - birthday
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique du contact
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         phone:
 *           type: string
 *           example: "+33 6 12 34 56 78"
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         birthday:
 *           type: string
 *           format: date
 *           example: 1995-06-25
 *         photo:
 *           type: string
 *           example: "https://cdn.example.com/photos/john.jpg"
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Créer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *       401:
 *         description: Utilisateur non authentifié
 *       500:
 *         description: Erreur serveur
 *   get:
 *     summary: Récupérer tous les contacts (admin)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les contacts
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.post('/', requireAuth, contactController.postContact);
router.get('/', requireAuth, contactController.getAllContacts);

/**
 * @swagger
 * /api/contacts/user:
 *   get:
 *     summary: Récupérer les contacts du user connecté
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts de l'utilisateur connecté
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.get('/user', requireAuth, contactController.getContactsByUser);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Récupérer un contact par ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact trouvé
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 *   patch:
 *     summary: Mettre à jour un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à supprimer
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', requireAuth, contactController.getContactById);
router.patch('/:id', requireAuth, contactController.updateContact);
router.delete('/:id', requireAuth, contactController.deleteContact);

module.exports = router;
