const db = require('../config/db');

exports.crearProducto = async (req, res) => {
  const { nombre_corte, categoria, precio_mayor_kg, precio_menor_kg } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO producto (nombre_corte, categoria, precio_mayor_kg, precio_menor_kg)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre_corte, categoria, precio_mayor_kg, precio_menor_kg]
    );
    res.status(201).json({ message: 'Producto creado correctamente', producto: result.rows[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
