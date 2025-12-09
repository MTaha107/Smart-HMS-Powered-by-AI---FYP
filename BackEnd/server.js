require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./database');

const app = express()

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

app.use(express.json());

connectDB();

app.get('/', (req, res) => res.send('HMS API Running'));


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
