const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;


//Inscription
exports.createUser = async (req, res) => {
  try {
    const { email, mdp, pseudo } = req.body;

    const existeUser = await User.findOne({ email });
    if (existeUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedMdp = await bcrypt.hash(mdp, 10);

    const newUser = await User.create({
      email,
      mdp: hashedMdp,
      pseudo
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Connexion
exports.loginUser = async (req, res) => {
  try {

    const { email, mdp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(mdp, user.mdp);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};