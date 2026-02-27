require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('Falta definir JWT_SECRET en variables de entorno');
    }

    if (!process.env.MONGODB_URI) {
      throw new Error('Falta definir MONGODB_URI en variables de entorno');
    }

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error.message);
    process.exit(1);
  }
};

startServer();
