"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const path_1 = __importDefault(require("path"));
const gameState_1 = require("./utils/gameState");
const socket_1 = require("./socket");
const app = (0, express_1.default)();
const frontend = path_1.default.join(__dirname, '..', 'math-quiz-real-time-frontend', 'dist');
const PORT = process.env.PORT || 3000;
const httpServer = (0, http_1.createServer)(app);
app.use(express_1.default.json());
app.use(express_1.default.static(frontend));
gameState_1.gameState.generateQuestion();
(0, socket_1.webSocket)(httpServer);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(frontend, "index.html"));
});
app.get('/check-server-status', (req, res) => {
    res.send('Server is running');
});
httpServer.on('error', (error) => {
    console.error('HTTP Server error:', error);
});
httpServer.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
