import express from 'express';
import {calculateBmi, calculateExercices, Excercises, parseExercises} from './utils';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const {height, weight} = req.query;

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.json({error: 'malformatted parameters'});
    }
    const bmi = calculateBmi(Number(height), Number(weight));

    return res.json({
        weight,
        height,
        bmi
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
    const {daily_exercises, target} = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).send({error: 'parameters missing'});
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const exercises: Excercises = parseExercises(daily_exercises, target);
        return res.json(calculateExercices(exercises));
    } catch (error) {
        const errorMessage = {error: 'Something bad happened.'};
        if (error instanceof Error) {
            errorMessage['error'] = error.message;
        }
        return res.json(errorMessage);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
