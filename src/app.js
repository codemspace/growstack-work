const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const workflowRoutes = require('./routes/workflowRoutes');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use('/api', userRoutes);
app.use('/api', workflowRoutes);

module.exports = app;
