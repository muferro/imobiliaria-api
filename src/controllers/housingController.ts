import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HousingLocation } from '../models/HousingLocation';

// Tratador de erros de validação
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

// GET: Listar todos os imóveis com paginação e filtros
export const listHousingLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
    const city = req.query.city as string | undefined;
    const state = req.query.state as string | undefined;

    const skip = (page - 1) * limit;
    const filters: any = {};

    // Construir filtros
    if (city) {
      filters.city = { $regex: city, $options: 'i' }; // Case-insensitive
    }
    if (state) {
      filters.state = state.toUpperCase();
    }

    // Executar queries em paralelo
    const [data, total] = await Promise.all([
      HousingLocation.find(filters)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      HousingLocation.countDocuments(filters),
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

// GET: Obter um imóvel por ID
export const getHousingLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const housing = await HousingLocation.findById(id);

    if (!housing) {
      res.status(404).json({
        success: false,
        message: 'Imóvel não encontrado',
      });
      return;
    }

    res.json({
      success: true,
      data: housing,
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

// POST: Criar novo imóvel
export const createHousingLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (handleValidationErrors(req, res)) return;

    const newLocation = new HousingLocation(req.body);
    const saved = await newLocation.save();

    res.status(201).json({
      success: true,
      message: 'Imóvel criado com sucesso',
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

// PUT: Atualizar imóvel
export const updateHousingLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (handleValidationErrors(req, res)) return;

    const { id } = req.params;
    const housing = await HousingLocation.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!housing) {
      res.status(404).json({
        success: false,
        message: 'Imóvel não encontrado',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Imóvel atualizado com sucesso',
      data: housing,
    });
  } catch (error) {
    if ((error as any).kind === 'ObjectId') {
      res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
      return;
    }
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

// DELETE: Deletar imóvel
export const deleteHousingLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const housing = await HousingLocation.findByIdAndDelete(id);

    if (!housing) {
      res.status(404).json({
        success: false,
        message: 'Imóvel não encontrado',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Imóvel deletado com sucesso',
      data: housing,
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
