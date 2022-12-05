interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

function calculateExercises(hours: Array<number>, target: number): Result {
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
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))