require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const webhookRoutes = require('./routes/webhook');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/webhook', webhookRoutes);

app.get('/events', async (req, res) => {
  const events = await mongoose.model('Event').find().sort({ timestamp: -1 }).limit(20);
  res.json(events);
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
