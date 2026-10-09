import { body, param, query } from 'express-validator';

// Validação para criar imóvel
export const validateCreateHousingLocation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 3, max: 100 })
    .withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('city')
    .trim()
    .notEmpty()
    .withMessage('Cidade é obrigatória')
    .isLength({ min: 2 })
    .withMessage('Cidade deve ter no mínimo 2 caracteres'),
  body('state')
    .trim()
    .notEmpty()
    .withMessage('Estado é obrigatório')
    .matches(/^[A-Z]{2}$/)
    .withMessage('Estado deve ser 2 letras maiúsculas (ex: SP, RJ)'),
  body('photo')
    .notEmpty()
    .withMessage('URL da foto é obrigatória')
    .isURL()
    .withMessage('URL da foto inválida'),
  body('availableUnits')
    .isInt({ min: 0 })
    .withMessage('Unidades disponíveis deve ser um número não-negativo'),
  body('wifi')
    .optional()
    .isBoolean()
    .withMessage('WiFi deve ser verdadeiro ou falso'),
  body('laundry')
    .optional()
    .isBoolean()
    .withMessage('Laundry deve ser verdadeiro ou falso'),
];

// Validação para atualizar imóvel
export const validateUpdateHousingLocation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('city')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Cidade deve ter no mínimo 2 caracteres'),
  body('state')
    .optional()
    .trim()
    .matches(/^[A-Z]{2}$/)
    .withMessage('Estado deve ser 2 letras maiúsculas (ex: SP, RJ)'),
  body('photo')
    .optional()
    .isURL()
    .withMessage('URL da foto inválida'),
  body('availableUnits')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Unidades disponíveis deve ser um número não-negativo'),
  body('wifi')
    .optional()
    .isBoolean()
    .withMessage('WiFi deve ser verdadeiro ou falso'),
  body('laundry')
    .optional()
    .isBoolean()
    .withMessage('Laundry deve ser verdadeiro ou falso'),
];

// Validação de ID
export const validateObjectId = [
  param('id')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('ID inválido'),
];

// Validação de paginação
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número maior que 0'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limite deve estar entre 1 e 50'),
];

// Validação para criar aplicação
export const validateCreateApplication = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('Primeiro nome é obrigatório')
    .isLength({ min: 2 })
    .withMessage('Primeiro nome deve ter no mínimo 2 caracteres'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Último nome é obrigatório')
    .isLength({ min: 2 })
    .withMessage('Último nome deve ter no mínimo 2 caracteres'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email é obrigatório')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .isMobilePhone('pt-BR')
    .withMessage('Telefone inválido'),
  body('housingLocationId')
    .optional()
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('ID do imóvel inválido'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Mensagem deve ter no máximo 500 caracteres'),
];

// Validação para atualizar status da aplicação
export const validateUpdateApplicationStatus = [
  body('status')
    .notEmpty()
    .withMessage('Status é obrigatório')
    .isIn(['pending', 'approved', 'rejected'])
    .withMessage('Status deve ser: pending, approved ou rejected'),
];
