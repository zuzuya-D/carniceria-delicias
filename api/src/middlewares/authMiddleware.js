const jwt = require('jsonwebtoken');

// Verificar si el usuario está autenticado
exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado: Token no proporcionado' });
  }

  try {
    const usuarioVerificado = jwt.verify(token, process.env.JWT_SECRET || 'secreto_delicias_andahuaylas');
    req.usuario = usuarioVerificado;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

// Restringir uso exclusivo a Administradores
exports.soloAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'administrador') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso denegado: Se requieren permisos de Administrador' });
  }
};
