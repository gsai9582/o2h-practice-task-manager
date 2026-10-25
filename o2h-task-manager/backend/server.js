const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { connectDB } = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api', taskRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  // Mongoose validation errors
  if (err && err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }

  console.error(err);
  return res.status(500).json({ success: false, message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.warn('MONGO_URI is not set. Please create backend/.env');
}

connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection failed:', err?.message || err);
    process.exit(1);
  });

