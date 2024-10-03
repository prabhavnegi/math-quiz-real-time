import { gameState } from "./gameState"

export const evaluateWinner = () => {
    const potentialWinners = gameState.getCurrentWinner();
    if(potentialWinners.length > 0) {
        potentialWinners.sort((a, b) => a.timeStamp - b.timeStamp);
        const finalWinner = potentialWinners[0];
        gameState.setQuestionAnswered(true);
        return finalWinner
    }
}