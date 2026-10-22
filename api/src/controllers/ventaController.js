const db = require('../config/db');

exports.registrarVenta = async (req, res) => {
  const client = await db.getClient();
  try {
    await client.query('BEGIN');
    
    const { id_local, id_trabajador, medio_pago, tipo_entrega, tipo_venta, detalles } = req.body;

    let total_pagado = detalles.reduce((acc, item) => acc + (item.cantidad_kg * item.precio_unitario_kg), 0);

    const ventaRes = await client.query(
      `INSERT INTO venta (id_local, id_trabajador, medio_pago, tipo_entrega, tipo_venta, total_pagado)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_venta`,
      [id_local, id_trabajador, medio_pago, tipo_entrega, tipo_venta, total_pagado]
    );
    const id_venta = ventaRes.rows[0].id_venta;

    for (let item of detalles) {
      await client.query(
        `INSERT INTO detalle_venta (id_venta, id_producto, cantidad_kg, precio_unitario_kg)
         VALUES ($1, $2, $3, $4)`,
        [id_venta, item.id_producto, item.cantidad_kg, item.precio_unitario_kg]
      );

      const stockRes = await client.query(
        `UPDATE stock_inventario 
         SET stock_kilos = stock_kilos - $1 
         WHERE id_local = $2 AND id_producto = $3 AND stock_kilos >= $1`,
        [item.cantidad_kg, id_local, item.id_producto]
      );

      if (stockRes.rowCount === 0) {
        throw new Error(`Stock insuficiente para el producto ID ${item.id_producto} en el local`);
      }
    }

    await client.query('COMMIT');
    res.status(201).json({ status: 'OK', message: 'Venta registrada e inventario actualizado', id_venta });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(400).json({ status: 'ERROR', error: error.message });
  } finally {
    client.release();
  }
};
