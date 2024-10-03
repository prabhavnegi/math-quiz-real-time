"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathProblemGenerator = void 0;
class MathProblemGenerator {
    static generate() {
        const problemTypes = ['arithmetic', 'percentage',];
        const selectedType = this.getRandomItem(problemTypes);
        switch (selectedType) {
            case 'arithmetic':
                return this.generateArithmeticProblem();
            case 'percentage':
                return this.generatePercentageProblem();
            default:
                const _exhaustiveCheck = selectedType;
                throw new Error(`Unhandled problem type: ${_exhaustiveCheck}`);
        }
    }
    static generateArithmeticProblem() {
        const operation = this.getRandomItem(this.operations);
        let num1 = this.getRandomInt(1, 100);
        let num2 = this.getRandomInt(1, 100);
        let question;
        let answer;
        switch (operation) {
            case '+':
                question = `${num1} + ${num2}`;
                answer = num1 + num2;
                break;
            case '-':
                // Ensure positive result
                if (num2 > num1) {
                    [num1, num2] = [num2, num1];
                }
                question = `${num1} - ${num2}`;
                answer = num1 - num2;
                break;
            case '*':
                // Keep multiplication manageable
                num2 = this.getRandomInt(1, 12);
                question = `${num1} × ${num2}`;
                answer = num1 * num2;
                break;
            case '/':
                // Ensure clean division
                answer = this.getRandomInt(1, 12);
                num2 = answer;
                const dividend = num1 * num2;
                question = `${dividend} ÷ ${num1}`;
                break;
            default:
                const _exhaustiveCheck = operation;
                throw new Error(`Unhandled operation: ${_exhaustiveCheck}`);
        }
        return { question, answer };
    }
    static generatePercentageProblem() {
        const wholeNumber = this.getRandomInt(100, 1000);
        const percentage = this.getRandomInt(10, 100);
        const question = `What is ${percentage}% of ${wholeNumber}?`;
        const answer = Math.round((wholeNumber * percentage) / 100);
        return { question, answer };
    }
    static getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
exports.MathProblemGenerator = MathProblemGenerator;
MathProblemGenerator.operations = ['+', '-', '*', '/'];
