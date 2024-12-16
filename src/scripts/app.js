import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import { connectToDatabase } from './config/database.js';

const app = express();
app.use(bodyParser.json());

connectToDatabase();
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server working at http://localhost:${PORT}`);
});
