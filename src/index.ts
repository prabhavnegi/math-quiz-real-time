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
app.use(express.static(path.join(frontend), {
    setHeaders: (res: express.Response, filePath: string) => {
        if (filePath.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.mjs')) {
            res.set('Content-Type', 'application/javascript');
        }
    }
}));
gameState.generateQuestion();

webSocket(httpServer)

app.get('*', (req, res) => {
    res.sendFile(path.join(frontend, "index.html"));
});

app.get('/check-server-status', (req, res) => {
    res.send('Server is running');
});

httpServer.on('error', (error) => {
    console.error('HTTP Server error:', error);
});

httpServer.listen(PORT, () => {
    console.log("Server running on port",PORT)
})

