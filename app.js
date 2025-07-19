const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const agentRoutes = require('./routes/agent');
const paymentRoutes = require('./routes/payment');
const chatRoutes = require('./routes/chat');
require('dotenv').config();
require('./models'); // DB init

const { authenticateToken } = require('./middleware/authMiddleware');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', authenticateToken, userRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);
app.use('/api/agent', authenticateToken, agentRoutes);
app.use('/api/payment', authenticateToken, paymentRoutes);
app.use('/api/chat', authenticateToken, chatRoutes);

app.get('/', (req, res) => res.send('Matchmaking App API Running'));

app.listen(5000, () => console.log('Server started on port 5000'));