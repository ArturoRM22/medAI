const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const User = require('./path/to/your/userModel'); // Update with the correct path to your user model

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Middleware to verify Firebase ID Token
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};

// Connect to MongoDB
mongoose.connect('ws://localhost:3001', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Endpoint to get user conversations
app.get('/user-conversations', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.uid);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user.conversations);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
