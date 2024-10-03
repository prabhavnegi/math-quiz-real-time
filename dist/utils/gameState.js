"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameState = void 0;
const mathProblems_1 = require("./mathProblems");
class GameState {
    constructor() {
        this.currentQuestion = null;
        this.questionAnswered = false;
        this.firstCorrectTimestamp = 0;
        this.users = [];
        this.currentWinner = [];
        this.timeOut = false;
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new GameState();
        }
        return this.instance;
    }
    generateQuestion() {
        this.currentQuestion = mathProblems_1.MathProblemGenerator.generate();
        this.firstCorrectTimestamp = 0;
        return this.currentQuestion;
    }
    setQuestionAnswered(questionAnswered) {
        this.questionAnswered = questionAnswered;
    }
    getQuestion() {
        return this.currentQuestion;
    }
    getQuestionAnswered() {
        return this.questionAnswered;
    }
    addNewUser(userName) {
        this.users.push({ userName: userName, score: 0, lastCorrectAnswer: 0 });
    }
    setUserData(userName, lastCorrectAnswer) {
        this.users.forEach(user => {
            if (user.userName === userName) {
                user.score += 1;
                user.lastCorrectAnswer = lastCorrectAnswer;
            }
        });
        this.firstCorrectTimestamp = lastCorrectAnswer;
    }
    getFirstCorrectTimestamp() {
        return this.firstCorrectTimestamp;
    }
    getUsers() {
        return this.users;
    }
    setCurrentWinner(data) {
        this.currentWinner.push(data);
    }
    getCurrentWinner() {
        return this.currentWinner;
    }
    clearCurrentWinner() {
        this.currentWinner = [];
    }
}
GameState.instance = null;
exports.gameState = GameState.getInstance();
