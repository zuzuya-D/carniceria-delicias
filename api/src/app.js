const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authController = require('./controllers/authController');
const productoController = require('./controllers/productoController');
const ventaRoutes = require('./routes/ventaRoutes');
const { verificarToken, soloAdmin } = require('./middlewares/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas Públicas
app.post('/api/auth/login', authController.login);
app.get('/api/health', (req, res) => res.json({ status: 'API activa' }));

// Rutas Protegidas (Requieren Login)
app.use('/api/ventas', verificarToken, ventaRoutes);

// Rutas Exclusivas de Administrador
app.post('/api/admin/empleados', verificarToken, soloAdmin, authController.registrarTrabajador);
app.post('/api/admin/productos', verificarToken, soloAdmin, productoController.crearProducto);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor API corriendo en puerto ${PORT}`));
