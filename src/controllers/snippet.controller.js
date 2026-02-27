const Snippet = require('../models/Snippet');
const asyncHandler = require('../utils/asyncHandler');

const buildUpdatePayload = (body) => {
  const allowedFields = ['title', 'language', 'code', 'tags'];

  return allowedFields.reduce((payload, field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
    return payload;
  }, {});
};

const createSnippet = asyncHandler(async (req, res) => {
  const { title, language, code, tags } = req.body;

  const snippet = await Snippet.create({
    user: req.user._id,
    title,
    language,
    code,
    tags,
  });

  return res.status(201).json({
    success: true,
    message: 'Snippet creado correctamente',
    data: snippet,
  });
});

const getMySnippets = asyncHandler(async (req, res) => {
  const snippets = await Snippet.find({ user: req.user._id }).sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: 'Snippets obtenidos correctamente',
    data: snippets,
  });
});

const updateSnippet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = buildUpdatePayload(req.body);

  const snippet = await Snippet.findOneAndUpdate(
    { _id: id, user: req.user._id },
    updates,
    { new: true, runValidators: true }
  );

  if (!snippet) {
    const error = new Error('Snippet no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: 'Snippet actualizado correctamente',
    data: snippet,
  });
});

const deleteSnippet = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const snippet = await Snippet.findOneAndDelete({ _id: id, user: req.user._id });

  if (!snippet) {
    const error = new Error('Snippet no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: 'Snippet eliminado correctamente',
    data: {
      _id: snippet._id,
    },
  });
});

module.exports = {
  createSnippet,
  getMySnippets,
  updateSnippet,
  deleteSnippet,
};
