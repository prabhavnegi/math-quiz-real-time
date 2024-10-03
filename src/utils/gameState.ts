import { timeStamp } from "console";
import { MathProblemGenerator } from "./mathProblems";

interface Problem {
    question: string;
    answer: number;
}

interface Users {
    userName: string,
    score: number,
    lastCorrectAnswer: number,
}

interface currUser {
    userName: string,
    timeStamp: number
}

class GameState {
    private static instance : GameState | null = null;
    private currentQuestion : Problem | null = null;
    private questionAnswered : boolean = false;
    private firstCorrectTimestamp: number = 0;
    private users: Users[] = []
    private currentWinner : currUser[] = [];
    public timeOut = false;

    private constructor() {}

    public static getInstance () {
        if(this.instance === null) {
            this.instance = new GameState();
        }
        return this.instance;
    }

    public generateQuestion() {
        this.currentQuestion = MathProblemGenerator.generate();
        this.firstCorrectTimestamp = 0;
        return this.currentQuestion;
    }

    public setQuestionAnswered(questionAnswered: boolean) {
        this.questionAnswered = questionAnswered
    }

    public getQuestion() {
        return this.currentQuestion;
    }

    public getQuestionAnswered() {
        return this.questionAnswered;
    }

    public addNewUser(userName: string) {
        this.users.push({userName: userName, score:0, lastCorrectAnswer: 0})
    }

    public setUserData(userName: string, lastCorrectAnswer: number) {
        this.users.forEach(user => {
            if(user.userName === userName) {
                user.score += 1
                user.lastCorrectAnswer = lastCorrectAnswer
            }
        })
        this.firstCorrectTimestamp = lastCorrectAnswer;
    }
    
    public getFirstCorrectTimestamp() {
        return this.firstCorrectTimestamp;
    }

    public getUsers() {
        return this.users
    }

    public setCurrentWinner(data: {userName: string, timeStamp: number}) {
        this.currentWinner.push(data);
    }

    public getCurrentWinner() {
        return this.currentWinner;
    }

    public clearCurrentWinner() {
        this.currentWinner = [];
    }
}

export const gameState = GameState.getInstance();