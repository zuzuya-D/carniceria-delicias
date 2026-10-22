const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ventaRoutes = require('./routes/ventaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/ventas', ventaRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'API activa - Carnicería Delicias' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor API corriendo en el puerto ${PORT}`));
