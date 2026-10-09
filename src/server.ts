import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import { connectDatabase } from './database/connection';
import housingRoutes from './routes/housing';
import applicationRoutes from './routes/applications';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const app: Express = express();

// Middleware de logging
app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

// CORS
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    environment: config.env,
  });
});

// API Info
app.get('/api/info', (_req: Request, res: Response) => {
  res.json({
    name: 'Imobiliária API',
    version: '1.0.0',
    environment: config.env,
    timestamp: new Date().toISOString(),
  });
});

// Rotas da API
app.use('/locations', housingRoutes);
app.use('/applications', applicationRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler (deve ser o último middleware)
app.use(errorHandler);

// Inicializar servidor
const startServer = async (): Promise<void> => {
  try {
    // Conectar ao banco de dados
    await connectDatabase();

    // Iniciar servidor
    app.listen(config.port, config.host, () => {
      console.log(`
╔════════════════════════════════════════════╗
║   Imobiliária API - Servidor Iniciado      ║
║                                            ║
║   Environment: ${config.env.padEnd(27)}║
║   URL: http://${config.host}:${config.port}${' '.repeat(26 - config.port.toString().length)}║
║   MongoDB: Conectado                       ║
║                                            ║
╚════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('✗ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Tratamento de sinais para graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n✓ SIGTERM recebido. Encerrando gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n✓ SIGINT recebido. Encerrando gracefully...');
  process.exit(0);
});

// Iniciar aplicação
startServer();

export default app;
