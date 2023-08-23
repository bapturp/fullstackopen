export type Operation = 'multiply' | 'add' | 'divide';

export const calculator = (a: number, b: number, op: Operation): number => {
    switch(op) {
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) throw new Error('can\'t divide by zero!');
            return a/b;
        case 'add':
            return a+b;
        default:
            throw new Error('Operation is not permited.');
    }
};

try {
    console.log(calculator(2,8,'multiply'));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += error.message;
    }

    console.error(errorMessage);
}

