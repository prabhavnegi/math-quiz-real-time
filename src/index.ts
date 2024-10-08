import express from "express";
import { createServer } from 'http';
import path from "path";
import { gameState } from "./utils/gameState";
import { webSocket } from "./socket";

const app = express();

const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

gameState.generateQuestion();

webSocket(httpServer)

app.get('/check-server-status', (req, res) => {
    res.send('Server is running');
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

httpServer.on('error', (error) => {
    console.error('HTTP Server error:', error);
});

httpServer.listen(PORT, () => {
    console.log("Server running on port",PORT)
})

