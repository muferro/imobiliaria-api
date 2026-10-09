import { Request, Response, NextFunction } from 'express';
import config from '../config';

interface ApiError extends Error {
  status?: number;
  details?: any;
}

export class AppError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
    public details?: any
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  error: ApiError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = (error as any).status || 500;
  const message = error.message || 'Erro interno do servidor';
  const details = (error as any).details;

  console.error(`[${new Date().toISOString()}] ${status} - ${message}`, {
    path: req.path,
    method: req.method,
    error: config.env === 'development' ? error : undefined,
  });

  res.status(status).json({
    success: false,
    message,
    ...(config.env === 'development' && { error: error.message }),
    ...(details && { details }),
  });
};

// Middleware 404
export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const error = new AppError(`Rota não encontrada: ${req.method} ${req.path}`, 404);
  next(error);
};
