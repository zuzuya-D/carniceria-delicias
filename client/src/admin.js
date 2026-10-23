const token = localStorage.getItem('token');
const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

// Verificar si el usuario es administrador
if (!token || usuario.rol !== 'administrador') {
  alert("Acceso denegado. Debe iniciar sesión como Administrador.");
  window.location.href = 'index.html';
}

// 1. Registrar Empleado
document.getElementById('form-empleado').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    nombres: document.getElementById('emp-nombres').value,
    telefono: document.getElementById('emp-telefono').value,
    usuario: document.getElementById('emp-usuario').value,
    password: document.getElementById('emp-password').value,
    id_local: parseInt(document.getElementById('emp-local').value),
    rol: document.getElementById('emp-rol').value
  };

  const res = await fetch('http://localhost:4000/api/admin/empleados', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById('mensaje-admin').innerText = result.message || result.error;
});

// 2. Crear Producto
document.getElementById('form-producto').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    nombre_corte: document.getElementById('prod-nombre').value,
    categoria: document.getElementById('prod-categoria').value,
    precio_menor_kg: parseFloat(document.getElementById('prod-precio-menor').value),
    precio_mayor_kg: parseFloat(document.getElementById('prod-precio-mayor').value)
  };

  const res = await fetch('http://localhost:4000/api/admin/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById('mensaje-admin').innerText = result.message || result.error;
});

// Cerrar sesión
document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'index.html';
});
