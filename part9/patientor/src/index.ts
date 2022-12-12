import express from "express";
import diagnosesRouter from './routes/diagnoses';
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


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});