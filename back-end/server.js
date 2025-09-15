// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/visual-algorithms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  favorites: [{
    algorithmId: String,
    algorithmName: String,
    dataStructure: String,
    favoritedAt: {
      type: Date,
      default: Date.now
    }
  }],
  progress: [{
    algorithmId: String,
    algorithmName: String,
    completed: Boolean,
    completedAt: Date,
    attempts: {
      type: Number,
      default: 0
    }
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

// Algorithm data import
import { collections, algorithms, arrays, linkedListFunctions, stackFunctions, queueFunctions, binaryHeapFunctions } from './data/algorithms.js';

// Auth middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Helper function to get all algorithms
const getAllAlgorithms = () => {
  return [
    ...algorithms,
    ...arrays,
    ...linkedListFunctions,
    ...stackFunctions,
    ...queueFunctions,
    ...binaryHeapFunctions
  ];
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.email === email ? 'Email already registered' : 'Username already taken'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        favorites: user.favorites,
        progress: user.progress
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      favorites: req.user.favorites,
      progress: req.user.progress
    }
  });
});

// Favorites Routes
app.post('/api/favorites/:algorithmId', authenticateToken, async (req, res) => {
  try {
    const { algorithmId } = req.params;
    const user = req.user;

    // Find algorithm details
    const allAlgorithms = getAllAlgorithms();
    const algorithm = allAlgorithms.find(algo => 
      algo.id === algorithmId || 
      algo.name.toLowerCase().replace(/\s+/g, '-') === algorithmId
    );

    if (!algorithm) {
      return res.status(404).json({ error: 'Algorithm not found' });
    }

    // Check if already favorited
    const existingFavorite = user.favorites.find(fav => fav.algorithmId === algorithmId);
    if (existingFavorite) {
      return res.status(400).json({ error: 'Algorithm already in favorites' });
    }

    // Add to favorites
    user.favorites.push({
      algorithmId: algorithmId,
      algorithmName: algorithm.name,
      dataStructure: algorithm.dataStructure || algorithm.route
    });

    await user.save();

    res.json({
      message: 'Algorithm added to favorites',
      favorites: user.favorites
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

app.delete('/api/favorites/:algorithmId', authenticateToken, async (req, res) => {
  try {
    const { algorithmId } = req.params;
    const user = req.user;

    // Remove from favorites
    user.favorites = user.favorites.filter(fav => fav.algorithmId !== algorithmId);
    await user.save();

    res.json({
      message: 'Algorithm removed from favorites',
      favorites: user.favorites
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

app.get('/api/favorites', authenticateToken, async (req, res) => {
  res.json({ favorites: req.user.favorites });
});

// Progress Routes
app.post('/api/progress/:algorithmId', authenticateToken, async (req, res) => {
  try {
    const { algorithmId } = req.params;
    const { completed } = req.body;
    const user = req.user;

    // Find algorithm details
    const allAlgorithms = getAllAlgorithms();
    const algorithm = allAlgorithms.find(algo => algo.id === algorithmId);

    if (!algorithm) {
      return res.status(404).json({ error: 'Algorithm not found' });
    }

    // Find or create progress entry
    let progressEntry = user.progress.find(p => p.algorithmId === algorithmId);
    
    if (progressEntry) {
      progressEntry.attempts += 1;
      if (completed && !progressEntry.completed) {
        progressEntry.completed = true;
        progressEntry.completedAt = new Date();
      }
    } else {
      progressEntry = {
        algorithmId,
        algorithmName: algorithm.name,
        completed: completed || false,
        completedAt: completed ? new Date() : null,
        attempts: 1
      };
      user.progress.push(progressEntry);
    }

    await user.save();

    res.json({
      message: 'Progress updated',
      progress: user.progress
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Algorithm Routes (same as before)
app.get('/api/collections', (req, res) => {
  res.json(collections);
});

app.get('/api/algorithms', (req, res) => {
  res.json(algorithms);
});

app.get('/api/algorithms/:dataStructure', (req, res) => {
  const { dataStructure } = req.params;
  
  let filteredData = [];
  
  switch(dataStructure) {
    case 'sorting':
      filteredData = algorithms.filter(algo => algo.dataStructure === 'sorting');
      break;
    case 'arrays':
      filteredData = arrays;
      break;
    case 'linkedlists':
      filteredData = linkedListFunctions;
      break;
    case 'stack':
      filteredData = stackFunctions;
      break;
    case 'queue':
      filteredData = queueFunctions;
      break;
    case 'binaryheaps':
      filteredData = binaryHeapFunctions;
      break;
    default:
      return res.status(404).json({ error: 'Data structure not found' });
  }
  
  res.json(filteredData);
});

app.get('/api/search', (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  const allAlgorithms = getAllAlgorithms();
  const results = allAlgorithms.filter(algo =>
    algo.name.toLowerCase().includes(query.toLowerCase()) ||
    (algo.desc && algo.desc.toLowerCase().includes(query.toLowerCase()))
  );
  
  res.json(results);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});