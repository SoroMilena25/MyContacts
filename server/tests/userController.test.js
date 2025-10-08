const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userController = require('../controllers/UserController');

// 🔹 On mocke Mongoose et bcrypt/jwt pour éviter les vraies dépendances
jest.mock('../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('devrait créer un nouvel utilisateur', async () => {
      const req = {
        body: { email: 'test@test.com', mdp: '1234', pseudo: 'TestUser' },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.create.mockResolvedValue({ _id: '123', email: 'test@test.com' });

      await userController.createUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@test.com' });
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(User.create).toHaveBeenCalledWith({
        email: 'test@test.com',
        mdp: 'hashedPassword',
        pseudo: 'TestUser',
      });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('devrait refuser un utilisateur déjà existant', async () => {
      const req = { body: { email: 'test@test.com' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne.mockResolvedValue({ email: 'test@test.com' });

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });
  });

  describe('loginUser', () => {
    it('devrait retourner un token si le login est correct', async () => {
      const req = { body: { email: 'test@test.com', mdp: '1234' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const fakeUser = { _id: '123', email: 'test@test.com', mdp: 'hashed' };
      User.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fakeToken');

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        user: fakeUser,
        token: 'fakeToken',
      });
    });
  });
});
