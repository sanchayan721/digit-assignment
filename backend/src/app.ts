// src/app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  }
));

// Use user and authentication routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
