"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSocket = void 0;
const socket_io_1 = require("socket.io");
const checkAnswer_1 = require("./utils/checkAnswer");
const gameState_1 = require("./utils/gameState");
const evaluateWinner_1 = require("./utils/evaluateWinner");
let io;
const webSocket = (httpServer) => {
    // io = new Server(httpServer, {
    //     cors: {
    //         origin: "http://localhost:5173",
    //         credentials: true
    //     },
    // });
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: 'https://math-quiz-real-time.onrender.com',
            credentials: true
        },
    });
    io.on('connect_error', (error) => {
        console.error('Socket.IO connect error:', error);
    });
    io.on('connect_timeout', (timeout) => {
        console.error('Socket.IO connect timeout:', timeout);
    });
    io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        const username = socket.handshake.query.username;
        if (!username) {
            socket.disconnect();
            return;
        }
        if (Array.isArray(username)) {
            console.log("Client connected:", username[0]);
            const userExist = gameState_1.gameState.getUsers().find(user => user.userName === username[0]);
            if (!userExist)
                gameState_1.gameState.addNewUser(username[0]);
            handlers(socket);
        }
        else if (username) {
            console.log("Client connected:", username);
            const userExist = gameState_1.gameState.getUsers().find(user => user.userName === username);
            if (!userExist)
                gameState_1.gameState.addNewUser(username);
            handlers(socket);
        }
        const problem = gameState_1.gameState.getQuestion();
        if (problem)
            socket.emit("new-question", { question: problem.question });
        else {
            const question = gameState_1.gameState.generateQuestion();
            socket.emit("new-question", { question });
        }
        const leaderboardData = gameState_1.gameState.getUsers();
        leaderboardData.sort((a, b) => {
            if (a.score != b.score) {
                return b.score - a.score;
            }
            return b.lastCorrectAnswer - a.lastCorrectAnswer;
        });
        io.emit("leaderboard", { leaderboardData });
    }));
};
exports.webSocket = webSocket;
const handlers = (socket) => {
    socket.on("submit-answer", (data, callback) => {
        if (gameState_1.gameState.getQuestionAnswered())
            return;
        const timeStamp = Date.now();
        const { currUser, answer } = data;
        const result = (0, checkAnswer_1.checkAnswer)(currUser, answer, timeStamp);
        if (!result) {
            callback({ success: false, message: "Incorrect answer. Try again!" });
        }
        else {
            if (!gameState_1.gameState.timeOut) {
                gameState_1.gameState.timeOut = true;
                setTimeout(() => {
                    const winner = (0, evaluateWinner_1.evaluateWinner)();
                    if (winner) {
                        gameState_1.gameState.setUserData(winner.userName, winner.timeStamp);
                        io.emit("winner", { winner: winner.userName });
                        gameState_1.gameState.clearCurrentWinner();
                        gameState_1.gameState.timeOut = false;
                        const { question } = gameState_1.gameState.generateQuestion();
                        gameState_1.gameState.setQuestionAnswered(false);
                        const leaderboardData = gameState_1.gameState.getUsers();
                        leaderboardData.sort((a, b) => {
                            if (a.score != b.score) {
                                return b.score - a.score;
                            }
                            return b.lastCorrectAnswer - a.lastCorrectAnswer;
                        });
                        io.emit("new-question", { question });
                        io.emit("leaderboard", { leaderboardData });
                    }
                }, 2000);
            }
        }
    });
};
