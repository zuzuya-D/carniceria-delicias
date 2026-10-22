document.getElementById('form-venta').addEventListener('submit', async (e) => {
  e.preventDefault();

  const ventaData = {
    id_local: parseInt(document.getElementById('select-local').value),
    id_trabajador: "00000000-0000-0000-0000-000000000000", // ID Vendedor demo
    medio_pago: document.getElementById('medio_pago').value,
    tipo_entrega: document.getElementById('tipo_entrega').value,
    tipo_venta: document.getElementById('tipo_venta').value,
    detalles: [
      {
        id_producto: parseInt(document.getElementById('id_producto').value),
        cantidad_kg: parseFloat(document.getElementById('cantidad_kg').value),
        precio_unitario_kg: parseFloat(document.getElementById('precio_unitario').value)
      }
    ]
  };

  try {
    const res = await fetch('http://localhost:4000/api/ventas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ventaData)
    });
    const result = await res.json();
    document.getElementById('mensaje').innerText = result.message || result.error;
  } catch (err) {
    document.getElementById('mensaje').innerText = "Error al conectar con el servidor API";
  }
});
