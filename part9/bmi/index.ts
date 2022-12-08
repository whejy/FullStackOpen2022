import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, parseArguments } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
    const {height, weight} = req.query;
    const bmi = calculateBmi(Number(height), Number(weight));

    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).json({error: 'malformatted parameters'});
    } else {
        res.json({height, weight, bmi});
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {target, dailyHours} = req.body;

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const {parsedTarget, parsedDailyHours} = parseArguments(target, dailyHours);
        const result = calculateExercises(parsedTarget, parsedDailyHours);
        res.json(result);
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        res.status(400).json({error: error.message});
    }

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});