import express from 'express';
import aiRoutes from './routes/ai.routes.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


export default app;