import { Router } from 'express';
import {
  createApplication,
  listApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/applicationController';
import {
  validateCreateApplication,
  validateUpdateApplicationStatus,
  validateObjectId,
  validatePagination,
} from '../middlewares/validation';

const router = Router();

// GET /applications - Listar todos com paginação e filtros
router.get('/', validatePagination, listApplications);

// GET /applications/:id - Obter por ID
router.get('/:id', validateObjectId, getApplicationById);

// POST /applications - Criar novo
router.post('/', validateCreateApplication, createApplication);

// PUT /applications/:id/status - Atualizar status
router.put(
  '/:id/status',
  validateObjectId,
  validateUpdateApplicationStatus,
  updateApplicationStatus
);

// DELETE /applications/:id - Deletar
router.delete('/:id', validateObjectId, deleteApplication);

export default router;
