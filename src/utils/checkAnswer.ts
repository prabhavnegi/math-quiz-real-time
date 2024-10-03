import { gameState } from "./gameState";

export const checkAnswer = (userId: string, userAnswer:string, timeStamp: number) => {
    if(isNaN(Number(userAnswer))) {
        console.log("Inavlid answer was given")
        return false
    }
    const currentQuestion = gameState.getQuestion();
    if(currentQuestion) {
        if(currentQuestion.answer === Number(userAnswer)) {
            gameState.setCurrentWinner({userName: userId, timeStamp: timeStamp })
            return true;
        }
    }
}