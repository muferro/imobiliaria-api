import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Application } from '../models/Application';

const handleValidationErrors = (req: Request, res: Response): boolean => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Erro de validação',
      errors: errors.array().map((err: any) => ({
        field: err.param,
        message: err.msg,
      })),
    });
    return true;
  }
  return false;
};

// POST: Criar nova aplicação
export const createApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (handleValidationErrors(req, res)) return;

    const newApplication = new Application(req.body);
    const saved = await newApplication.save();

    res.status(201).json({
      success: true,
      message: 'Aplicação criada com sucesso',
      data: saved,
    });
  } catch (error) {
    if ((error as any).name === 'ValidationError') {
      const messages = Object.values((error as any).errors).map(
        (err: any) => err.message
      );
      res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: messages,
      });
      return;
    }
    next(error);
  }
};

// GET: Listar todas as aplicações
export const listApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
    const status = req.query.status as string | undefined;

    const skip = (page - 1) * limit;
    const filters: any = {};

    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      filters.status = status;
    }

    const [data, total] = await Promise.all([
      Application.find(filters)
        .populate('housingLocationId', 'name city')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      Application.countDocuments(filters),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET: Obter aplicação por ID
export const getApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id).populate(
      'housingLocationId'
    );

    if (!application) {
      res.status(404).json({
        success: false,
        message: 'Aplicação não encontrada',
      });
      return;
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    if ((error as any).kind === 'ObjectId') {
      res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
      return;
    }
    next(error);
  }
};

// PUT: Atualizar status da aplicação
export const updateApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Status inválido. Use: pending, approved ou rejected',
      });
      return;
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      res.status(404).json({
        success: false,
        message: 'Aplicação não encontrada',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Status atualizado com sucesso',
      data: application,
    });
  } catch (error) {
    if ((error as any).kind === 'ObjectId') {
      res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
      return;
    }
    next(error);
  }
};

// DELETE: Deletar aplicação
export const deleteApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      res.status(404).json({
        success: false,
        message: 'Aplicação não encontrada',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Aplicação deletada com sucesso',
      data: application,
    });
  } catch (error) {
    if ((error as any).kind === 'ObjectId') {
      res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
      return;
    }
    next(error);
  }
};
