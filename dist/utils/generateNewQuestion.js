"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNewQuestion = void 0;
const mathProblems_1 = require("./mathProblems");
const generateNewQuestion = () => {
    const { question, answer } = mathProblems_1.MathProblemGenerator.generate();
    return { question, answer };
};
exports.generateNewQuestion = generateNewQuestion;
