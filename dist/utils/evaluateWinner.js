"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateWinner = void 0;
const gameState_1 = require("./gameState");
const evaluateWinner = () => {
    const potentialWinners = gameState_1.gameState.getCurrentWinner();
    if (potentialWinners.length > 0) {
        potentialWinners.sort((a, b) => a.timeStamp - b.timeStamp);
        const finalWinner = potentialWinners[0];
        gameState_1.gameState.setQuestionAnswered(true);
        return finalWinner;
    }
};
exports.evaluateWinner = evaluateWinner;
