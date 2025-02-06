import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.get('/', async (req, res) => {
    try {
        const questions = await prisma.question.findMany();
        res.json(questions);
    } catch (error) {
        console.error('Erro ao buscar questões:', error);
        res.status(500).json({ message: 'Erro ao buscar questões' });
    }
});

app.get('/difficulty=:difficulty', async (req, res) => {
    try {
        const { difficulty } = req.params;

        if (!difficulty) {
            return res.status(400).json({ message: 'Parâmetro "difficulty" não fornecido!' });
        }

        const questions = await prisma.question.findMany({
            where: {
                difficulty: difficulty,
            },
        });

        res.json(questions);
    } catch (error) {
        console.error('Erro ao buscar questões:', error);
        res.status(500).json({ message: 'Erro ao buscar questões' });
    }
});

app.get('/type=:type', async (req, res) => {
    try {
        const { type } = req.params;

        if (!type) {
            return res.status(400).json({ message: 'Parâmetro "type" não fornecido!' });
        }

        const questions = await prisma.question.findMany({
            where: {
                type: type,
            },
        });

        res.json(questions);
    } catch (error) {
        console.error('Erro ao buscar questões:', error);
        res.status(500).json({ message: 'Erro ao buscar questões' });
    }
});

export default app;