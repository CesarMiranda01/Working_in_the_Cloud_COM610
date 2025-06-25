import express from 'express';
import cors from 'cors';
import managerRoutes from './modules/managers/routes';
import userRoutes from './modules/users/routes';
import classRoutes from './modules/classes/routes';

const app = express();

app.use(cors());
app.use(express.json());
// Agrega esto antes de las otras rutas
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API',
    endpoints: {
      managers: '/api/managers',
      users: '/api/users',
      classes: '/api/classes'
    }
  });
});
// Routes
app.use('/api/managers', managerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;