import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan'; // ejemplo de rutas
import mainRouter from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swagger.config';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api', mainRouter);

// Ruta de prueba
app.get('/', (_req, res) => {
    res.send('API REST funcionando');
});

export default app;
