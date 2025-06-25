import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 8000;
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDatabase from './db/db.js';

import taskRoute from './routes/task.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const allowedOrigins = [
  'http://localhost:5173',
  'https://seekhelpers-task-todo-dyol.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use('/api/tasks', taskRoute);

connectDatabase();

app.get('/', (req, res) => {
  res.send('hello todo ..')
})

// Handling global error
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at port http://localhost:${PORT}`);
});


