import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from './routes/auth.route';
import { PORT } from './constant';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello from Not use bun!');
});

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`😁 Server running at http://localhost:${PORT}`);
});
