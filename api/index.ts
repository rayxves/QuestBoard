import express from 'express';
import { PrismaClient } from '@prisma/client';
import post_seed_questions from './Routes/post_seed_questions';
import get_questions from './Routes/get_questions';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/seed_questions', post_seed_questions);
app.use('/questions', get_questions);

app.listen(5000, () => {
    console.log('Server is running on port 3000');
});