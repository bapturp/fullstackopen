export const calculateBmi = (sizeMeters: number, weightKilograms: number): string => {
    // The BMI is defined as the body mass divided by the square of the body height,
    // and is expressed in units of kg/m2,
    // resulting from mass in kilograms and height in metres.

    const bmi = weightKilograms / (sizeMeters ** 2);
    
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 25) {
        return 'Overweight';
    } else {
        return 'Normal';
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const numbersInArray = (arr: any[]): boolean => arr.every(val => !isNaN(Number(val)));

export interface TargetAmount {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export interface Excercises {
    dailyHours: number[];
    target: number;
}

export const calculateExercices = (exercices: Excercises): TargetAmount => {

    const {dailyHours,target} = exercices;

    const trainingDays: number = dailyHours.reduce((acc, val) => val !== 0 ? acc + 1: acc, 0);

    const sum: number  = dailyHours.reduce((acc, val) => acc + val, 0);
    const average: number = sum / dailyHours.length || 0;

    let rating = Infinity;
    
    if ((average / target) < 0.9) {
        rating = 1;
    } else if ((average / target) > 1.1) {
        rating = 3;
    } else {
        rating = 2;
    }

    let ratingDescription = '';

    switch (rating) {
        case 1:
            ratingDescription = "Below expectation.";
            break;
        case 2:
            ratingDescription = "Macthing expectation";
            break;
        case 3:
            ratingDescription = "Above expectation.";
            break;
    }

    return {
        periodLength: dailyHours.length,
        trainingDays,
        success: rating >= 2 ? true : false,
        rating,
        ratingDescription,
        target,
        average
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseExercises = (daily_exercises: any, target: any):Excercises => {
    if (!Array.isArray(daily_exercises) || !numbersInArray(daily_exercises) || isNaN(Number(target)))  {
        throw new Error('malformatted parameters');
    }

    return {
        dailyHours: daily_exercises.map(e=>Number(e)),
        target: Number(target)
    };
};