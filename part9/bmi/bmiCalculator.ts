function calculateBmi(height: number, weight: number): string {
    const bmi = weight / (height/ 100)**2;

    if (bmi <= 18.4) {
        return "Underweight";
    } else if (bmi >= 25) {
        return "Overweight";
    }
    return "Normal (healthy weight)";
};

console.log(calculateBmi(182, 74));