const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');


/**
 * @swagger
 * api/users:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Users]
 *     description: Permet à un utilisateur de s'inscrire en fournissant email, mot de passe et pseudo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - mdp
 *               - pseudo
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               mdp:
 *                 type: string
 *                 example: monmotdepasse
 *               pseudo:
 *                 type: string
 *                 example: testUser
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: L'utilisateur existe déjà
 *       500:
 *         description: Erreur serveur
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * api/users/login:
 *   get:
 *     summary: Connexion d'un utilisateur existant
 *     tags: [Users]
 *     description: Permet à un utilisateur de se connecter avec email et mot de passe.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email de l'utilisateur
 *       - in: query
 *         name: mdp
 *         schema:
 *           type: string
 *         required: true
 *         description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *       400:
 *         description: Mot de passe incorrect
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.post('/login', userController.loginUser);

module.exports = router;

