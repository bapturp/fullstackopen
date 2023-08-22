import {numbersInArray, calculateExercices, Excercises} from './utils';

const parseArgs = (args: string[]): Excercises => {
    if (!numbersInArray(args.slice(2)))  {
        throw new Error('All arguments must be numbers.');
    }
    
    return {
        dailyHours: args.slice(3).map(e => Number(e)),
        target: Number(args[2])
    };
};

try {
    const exercices = parseArgs(process.argv);
    console.log(calculateExercices(exercices));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
    }
    console.error(errorMessage);
}
