import { Server, Socket } from "socket.io";
import { Server as HTTPServer} from "http";
import { checkAnswer } from "./utils/checkAnswer";
import { gameState } from "./utils/gameState";
import { evaluateWinner } from "./utils/evaluateWinner";

let io : Server;

export const webSocket = (httpServer: HTTPServer) => {
    
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        },
    });

    io.on('connect_error', (error) => {
        console.error('Socket.IO connect error:', error);
    });
    
    io.on('connect_timeout', (timeout) => {
        console.error('Socket.IO connect timeout:', timeout);
    });

    io.on("connection", async (socket)=>{
        const username = socket.handshake.query.username;
        if(!username) {
            socket.disconnect();
            return
        } 
        if(Array.isArray(username)) {
            console.log("Client connected:",username[0]);
            const userExist = gameState.getUsers().find(user => user.userName === username[0]);
            if(!userExist)
                gameState.addNewUser(username[0]);
            handlers(socket);
        }
        else if (username) {
            console.log("Client connected:",username);
            const userExist = gameState.getUsers().find(user => user.userName === username);
            if(!userExist)
                gameState.addNewUser(username);
            handlers(socket);
        }
        const problem = gameState.getQuestion()
        if(problem)      
            socket.emit("new-question", { question: problem.question});
        else {
            const question = gameState.generateQuestion();
            socket.emit("new-question", { question });
        }
        const leaderboardData = gameState.getUsers()
        leaderboardData.sort( (a,b) => {
            if(a.score != b.score) {
                return b.score - a.score;
            }
            return b.lastCorrectAnswer - a.lastCorrectAnswer
        })
        io.emit("leaderboard", { leaderboardData });
    })
}

const handlers = (socket: Socket) => {
    socket.on("submit-answer", (data: {currUser: string, answer: string}, callback) => {
        if(gameState.getQuestionAnswered())
            return
        const timeStamp = Date.now();
        const { currUser, answer } = data;
        const result = checkAnswer(currUser, answer, timeStamp);
        if(!result) {
            callback({ success: false, message: "Incorrect answer. Try again!" });
        }
        else {
            if(!gameState.timeOut) {
                gameState.timeOut = true;
                setTimeout(() => {
                    const winner = evaluateWinner()
                    if(winner) {
                        gameState.setUserData(winner.userName, winner.timeStamp);
                        io.emit("winner", {winner:winner.userName});
                        gameState.clearCurrentWinner();
                        gameState.timeOut = false;
                        const {question} = gameState.generateQuestion();
                        gameState.setQuestionAnswered(false)
                        const leaderboardData = gameState.getUsers()
                        leaderboardData.sort( (a,b) => {
                            if(a.score != b.score) {
                                return b.score - a.score;
                            }
                            return b.lastCorrectAnswer - a.lastCorrectAnswer
                        })
                        io.emit("new-question", {question} );
                        io.emit("leaderboard", {leaderboardData})
                    }
                }, 2000);
            }
        }
    })
}