const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.error(error.stack || error);
  }

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Error interno del servidor',
  });
};

module.exports = {
  notFound,
  errorHandler,
};
