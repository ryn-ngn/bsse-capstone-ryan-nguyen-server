const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || 'http://localhost';
const { getToken } = require('./utils/helper');

const users = require('./routes/users');
const userCars = require('./routes/userCars');
const journalEvents = require('./routes/journalEvents');
const cars = require('./routes/cars');
const openAI = require('./routes/openAI');

//middleware
app.use(cors());
app.use(express.json());

// apply authentication rule if routes being called are not login & register
app.use((req, res, next) => {
  if (req.url === '/api/users/register' || req.url === '/api/users/login') {
    return next();
  }

  const token = getToken(req);

  if (!token) {
    return res.status(403).json({ error: 'No token provided. Unauthorized.' });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, JWT_SECRET);
    req.decode = decoded;
    next();
  } catch (error) {
    // JWT verification failed
    console.error('JWT verification failed:', error);
    return res.status(403).json({ error: 'Invalid token. Unauthorized.' });
  }
});

// routes
app.use('/api/users', users);
app.use('/api/userCars', userCars);
app.use('/api/journalEvents', journalEvents);
app.use('/api/cars', cars);
app.use('/api/askOpenAI', openAI);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send(
      'An unexpected error occurred while processing your request. Please try again later'
    );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}:${PORT}`);
});
