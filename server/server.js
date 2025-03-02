import http from 'http';
import app from './app/app.js';
import dotenv from 'dotenv';
dotenv.config();

// Create the server
const PORT = process.env.PORT || 2030;
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
