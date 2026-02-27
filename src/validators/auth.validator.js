const { body } = require('express-validator');

const registerValidator = [
  body('name').trim().notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('email').trim().notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es válido').normalizeEmail(),
  body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const loginValidator = [
  body('email').trim().notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('El email no es válido').normalizeEmail(),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

module.exports = {
  registerValidator,
  loginValidator,
};
