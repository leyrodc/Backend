import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './rotues/authRoutes';

dotenv.config();    

const app = express();

const dbUrl = process.env.DB_URL;
if (!dbUrl) {
    throw new Error('No se ha encontrado la URL de la base de datos');
}


mongoose.connect(process.env.DB_URL as string)
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((error) => console.error('Error al conectar con la base de datos:', error));

app.use(express.json());


app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})