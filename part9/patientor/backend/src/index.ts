import express from "express";
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, ()=> {
    console.log(`server started on port ${PORT}`);
});
