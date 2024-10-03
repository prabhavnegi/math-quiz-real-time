import express from "express";
import { createServer } from 'http';
import path from "path";
import { gameState } from "./utils/gameState";
import { webSocket } from "./socket";

const app = express();

const frontend = path.join(__dirname, '..', 'math-quiz-real-time-frontend', 'dist');
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

app.use(express.json());
app.use(express.static(frontend, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
        }
    }
}));
gameState.generateQuestion();

webSocket(httpServer)

app.get('/check-server-status', (req, res) => {
    res.send('Server is running');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(frontend, "index.html"));
});

httpServer.on('error', (error) => {
    console.error('HTTP Server error:', error);
});

httpServer.listen(PORT, () => {
    console.log("Server running on port",PORT)
})

