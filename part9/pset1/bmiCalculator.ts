interface BMIInputValues{
    heightMeters: number;
    weightKilograms: number;
}

const parseArguments = (args: string[]): BMIInputValues => {
    if (args.length < 4) throw new Error('Not enough arguments provided.');
    if (args.length > 4) throw new Error('Too many arguments provided.');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            heightMeters: Number(args[2]),
            weightKilograms: Number(args[3])
        };
    } else {
        throw new Error('Provided values are not numbers.');
    }
};

const calculateBmi = (sizeMeters: number, weightKilograms: number): string => {
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

try {
    const { heightMeters, weightKilograms } = parseArguments(process.argv);
    console.log(calculateBmi(heightMeters,weightKilograms));
    
} catch (error: unknown) {
    let errorMessage: string = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ` ${error.message}`;
    }
    console.error(errorMessage);
}
 