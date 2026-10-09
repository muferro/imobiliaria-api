import { Router } from 'express';
import {
  listHousingLocations,
  getHousingLocationById,
  createHousingLocation,
  updateHousingLocation,
  deleteHousingLocation,
} from '../controllers/housingController';
import {
  validateCreateHousingLocation,
  validateUpdateHousingLocation,
  validateObjectId,
  validatePagination,
} from '../middlewares/validation';

const router = Router();

// GET /locations - Listar todos com paginação e filtros
router.get('/', validatePagination, listHousingLocations);

// GET /locations/:id - Obter por ID
router.get('/:id', validateObjectId, getHousingLocationById);

// POST /locations - Criar novo
router.post('/', validateCreateHousingLocation, createHousingLocation);

// PUT /locations/:id - Atualizar
router.put(
  '/:id',
  validateObjectId,
  validateUpdateHousingLocation,
  updateHousingLocation
);

// DELETE /locations/:id - Deletar
router.delete('/:id', validateObjectId, deleteHousingLocation);

export default router;
