"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAnswer = void 0;
const gameState_1 = require("./gameState");
const checkAnswer = (userId, userAnswer, timeStamp) => {
    if (isNaN(Number(userAnswer))) {
        console.log("Inavlid answer was given");
        return false;
    }
    const currentQuestion = gameState_1.gameState.getQuestion();
    if (currentQuestion) {
        if (currentQuestion.answer === Number(userAnswer)) {
            gameState_1.gameState.setCurrentWinner({ userName: userId, timeStamp: timeStamp });
            return true;
        }
    }
};
exports.checkAnswer = checkAnswer;
