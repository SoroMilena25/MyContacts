const Contact = require('../models/Contact');
const contactController = require('../controllers/ContactController');

jest.mock('../models/Contact');

describe('ContactController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait créer un contact', async () => {
    const req = {
      user: { userId: 'user123' },
      body: { firstName: 'John', phone: '+33600000000' },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Contact.create.mockResolvedValue({ _id: '1', ...req.body });

    await contactController.postContact(req, res);

    expect(Contact.create).toHaveBeenCalledWith({
      ...req.body,
      user_id: 'user123',
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('devrait retourner 401 si pas authentifié', async () => {
    const req = { user: null };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await contactController.postContact(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('devrait récupérer les contacts d’un user', async () => {
    const req = { user: { userId: 'user123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const fakeContacts = [{ firstName: 'John' }];
    Contact.find.mockResolvedValue(fakeContacts);

    await contactController.getContactsByUser(req, res);

    expect(Contact.find).toHaveBeenCalledWith({ user_id: 'user123' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeContacts);
  });
});
