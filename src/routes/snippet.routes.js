const express = require('express');
const {
  createSnippet,
  getMySnippets,
  updateSnippet,
  deleteSnippet,
} = require('../controllers/snippet.controller');
const { protect } = require('../middlewares/auth.middleware');
const validateFields = require('../middlewares/validate.middleware');
const {
  createSnippetValidator,
  updateSnippetValidator,
  idParamValidator,
} = require('../validators/snippet.validator');

const router = express.Router();

router.use(protect);

router.post('/', createSnippetValidator, validateFields, createSnippet);
router.get('/', getMySnippets);
router.put('/:id', updateSnippetValidator, validateFields, updateSnippet);
router.delete('/:id', idParamValidator, validateFields, deleteSnippet);

module.exports = router;
