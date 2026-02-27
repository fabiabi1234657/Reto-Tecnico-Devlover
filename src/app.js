const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const snippetRoutes = require('./routes/snippet.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando',
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/snippets', snippetRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
