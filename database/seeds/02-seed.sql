-- Insertar Locales
INSERT INTO local (nombre_local, direccion) VALUES
('Local 1 - Av. Perú', 'Av. Perú 450, Andahuaylas'),
('Local 2 - Mercado Central', 'Jr. Ramos 120, Andahuaylas');

-- Insertar Administrador por defecto (password: admin123)
INSERT INTO trabajador (id_local, nombres, telefono, usuario, password_hash, rol) VALUES
(1, 'Administrador General', '987654321', 'admin', '$2b$10$w0fI9vKxRkU3Z2K7hH4dEO3C.qWpA9S8yZ.3nK1e9A1e9A1e9A1e9', 'administrador');

-- Insertar Productos
INSERT INTO producto (nombre_corte, categoria, precio_mayor_kg, precio_menor_kg) VALUES
('Lomo Fino', 'Res', 32.00, 36.00),
('Bife Ancho', 'Res', 26.00, 30.00),
('Costilla de Cerdo', 'Cerdo', 18.00, 22.00);

-- Stock Inicial
INSERT INTO stock_inventario (id_local, id_producto, stock_kilos) VALUES
(1, 1, 50.00), (1, 2, 80.00), (1, 3, 40.00),
(2, 1, 30.00), (2, 2, 50.00), (2, 3, 35.00);
