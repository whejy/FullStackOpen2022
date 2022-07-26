// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
const prompt = require('prompt-sync')();

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface rawValues {
    rawTarget: string;
    rawHours: Array<string>;
}

interface parsedValues {
    parsedTarget: number;
    parsedDailyHours: Array<number>;
}

function getInput(): rawValues {
    const rawHours = [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const rawTarget = prompt('What is your target daily hours? ');

    for (let i = 1; i < 100; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const input = prompt(`How many hours did you exercise on day ${i}? (Press 'enter' to exit): `);

        if (input) {
            rawHours.push(input);
        } else {
            break;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return {rawTarget, rawHours};
}

export function parseArguments(rawTarget: string, rawHours: Array<string>): parsedValues {
    if (Number(rawTarget) <= 0) {
        throw new Error('target hours must be positive');
    }

    if (rawHours.length < 1) {
        throw new Error('parameters missing');
    }

    if (!Array.isArray(rawHours)) {
        throw new Error('malformatted parameters');
    }

    if (!isNaN(Number(rawTarget)) && !rawHours.some(el => isNaN(Number(el)))) {
        return {
            parsedTarget: Number(rawTarget),
            parsedDailyHours: rawHours.map(el => Number(el))
        };
    } else {
        throw new Error('malformatted parameters');
    }
}


export function calculateExercises(target: number, hours: Array<number>): Result {
    const periodLength = hours.length;
    const trainingDays = hours.filter(x => x > 0).length;
    const success = hours.every(x => x >= target);
    const total = hours.reduce((acc, curr) => acc + curr, 0);
    const average =  total / periodLength;
    const percentage = average / target;

    let rating = 3;
    let ratingDescription = "Well done!";

    if (percentage < 0.5) {
        rating = 0;
        ratingDescription = "There's always next week!";
    } else if (percentage < 0.75) {
        rating = 1;
        ratingDescription = "Still room for improvement.";
    } else if (percentage < 0.95) {
        rating = 2;
        ratingDescription = "Good effort. You can do it!";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

try {
    const {rawTarget, rawHours} = getInput();
    const {parsedTarget, parsedDailyHours} = parseArguments(rawTarget, rawHours);
    console.log(calculateExercises(parsedTarget, parsedDailyHours));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}