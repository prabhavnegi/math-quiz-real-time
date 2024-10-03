interface Problem {
    question: string;
    answer: number;
}
    
type Operation = '+' | '-' | '*' | '/';
type ProblemType = 'arithmetic' | 'percentage';
    
export class MathProblemGenerator {
    private static operations: Operation[] = ['+', '-', '*', '/'];
    
    static generate(): Problem {
        const problemTypes: ProblemType[] = ['arithmetic', 'percentage',];
        const selectedType = this.getRandomItem(problemTypes);
    
        switch (selectedType) {
            case 'arithmetic':
                return this.generateArithmeticProblem();
            case 'percentage':
                return this.generatePercentageProblem();
            default:
                const _exhaustiveCheck: never = selectedType;
                throw new Error(`Unhandled problem type: ${_exhaustiveCheck}`);
        }
    }
    
    private static generateArithmeticProblem(): Problem {
        const operation = this.getRandomItem(this.operations);
        let num1 = this.getRandomInt(1, 100);
        let num2 = this.getRandomInt(1, 100);
        
        let question: string;
        let answer: number;
    
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
                const _exhaustiveCheck: never = operation;
                throw new Error(`Unhandled operation: ${_exhaustiveCheck}`);
        }
    
        return { question, answer };
        }
    
        private static generatePercentageProblem(): Problem {
            const wholeNumber = this.getRandomInt(100, 1000);
            const percentage = this.getRandomInt(10, 100);
        
            const question = `What is ${percentage}% of ${wholeNumber}?`;
            const answer = Math.round((wholeNumber * percentage) / 100);
    
            return { question, answer };
        }
    
        private static getRandomItem<T>(array: T[]): T {
            return array[Math.floor(Math.random() * array.length)];
        }
    
        private static getRandomInt(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }