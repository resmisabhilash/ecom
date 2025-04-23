import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Token generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register
export const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password, isAdmin });

  res.status(201).json({
    _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await user.matchPassword(password)) {
    res.json({
      _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Profile
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
