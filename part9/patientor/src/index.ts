import express from "express";
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log("PINGED");
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});