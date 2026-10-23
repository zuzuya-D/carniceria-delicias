const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login de Usuario
exports.login = async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM trabajador WHERE usuario = $1', [usuario]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const trabajador = result.rows[0];
    const passwordValido = await bcrypt.compare(password, trabajador.password_hash);

    if (!passwordValido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: trabajador.id_trabajador, rol: trabajador.rol, nombres: trabajador.nombres },
      process.env.JWT_SECRET || 'secreto_delicias_andahuaylas',
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: { nombres: trabajador.nombres, rol: trabajador.rol, id_local: trabajador.id_local }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Registrar nuevo empleado (Solo Admin)
exports.registrarTrabajador = async (req, res) => {
  const { id_local, nombres, telefono, usuario, password, rol } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await db.query(
      `INSERT INTO trabajador (id_local, nombres, telefono, usuario, password_hash, rol)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_trabajador, nombres, rol`,
      [id_local, nombres, telefono, usuario, password_hash, rol]
    );

    res.status(201).json({ message: 'Empleado registrado exitosamente', trabajador: result.rows[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
