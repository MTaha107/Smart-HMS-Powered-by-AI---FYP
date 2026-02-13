require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./database');
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require("./socket");

const app = express()
const server = http.createServer(app);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (origin.startsWith('http://localhost')) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true
}));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  },
});
socketHandler(io);

app.use(express.json());

connectDB();


const userRoutes = require('./routes/user');
app.use('/users', userRoutes);
const doctorsDataRoutes = require('./routes/doctorsData');
app.use('/doctorsData', doctorsDataRoutes);
const messagesRoutes = require('./routes/messages');
app.use('/messages', messagesRoutes);
const aiChat = require('./routes/aiChat')
app.use('/api/ai', aiChat);

app.get('/', (req, res) => res.send('HMS API Running'));


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
