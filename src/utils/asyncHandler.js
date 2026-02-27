const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    if (typeof next === 'function') {
      return next(error);
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
    });
  }
};

module.exports = asyncHandler;
