const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const validateFields = require('../middlewares/validate.middleware');
const { registerValidator, loginValidator } = require('../validators/auth.validator');

const router = express.Router();

router.post('/register', registerValidator, validateFields, register);
router.post('/login', loginValidator, validateFields, login);

module.exports = router;
