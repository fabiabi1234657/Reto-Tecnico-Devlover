const { body, param } = require('express-validator');

const createSnippetValidator = [
  body('user').not().exists().withMessage('No se permite enviar el campo user'),
  body('title').trim().notEmpty().withMessage('El título es obligatorio').isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),
  body('language').optional().trim().isString().withMessage('El lenguaje debe ser texto'),
  body('code').trim().notEmpty().withMessage('El código es obligatorio'),
  body('tags').optional().isArray().withMessage('Tags debe ser un arreglo'),
  body('tags.*').optional().trim().isString().withMessage('Cada tag debe ser texto'),
];

const updateSnippetValidator = [
  param('id').isMongoId().withMessage('ID de snippet inválido'),
  body('user').not().exists().withMessage('No se permite editar el campo user'),
  body('title').optional().trim().isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),
  body('language').optional().trim().isString().withMessage('El lenguaje debe ser texto'),
  body('code').optional().trim().notEmpty().withMessage('El código no puede estar vacío'),
  body('tags').optional().isArray().withMessage('Tags debe ser un arreglo'),
  body('tags.*').optional().trim().isString().withMessage('Cada tag debe ser texto'),
];

const idParamValidator = [param('id').isMongoId().withMessage('ID de snippet inválido')];

module.exports = {
  createSnippetValidator,
  updateSnippetValidator,
  idParamValidator,
};
