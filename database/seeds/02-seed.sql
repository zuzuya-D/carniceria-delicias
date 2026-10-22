-- Insertar Locales
INSERT INTO local (nombre_local, direccion) VALUES
('Local 1 - Av. Perú', 'Av. Perú 450, Andahuaylas'),
('Local 2 - Mercado Central', 'Jr. Ramos 120, Andahuaylas');

-- Insertar Productos (Cortes)
INSERT INTO producto (nombre_corte, categoria, precio_mayor_kg, precio_menor_kg) VALUES
('Lomo Fino', 'Res', 32.00, 36.00),
('Bife Ancho', 'Res', 26.00, 30.00),
('Costilla de Cerdo', 'Cerdo', 18.00, 22.00),
('Carne Molida Especial', 'Res', 20.00, 24.00);

-- Inicializar Stock en Local 1 y Local 2
INSERT INTO stock_inventario (id_local, id_producto, stock_kilos) VALUES
(1, 1, 50.00), (1, 2, 80.00), (1, 3, 40.00), (1, 4, 60.00),
(2, 1, 30.00), (2, 2, 50.00), (2, 3, 35.00), (2, 4, 45.00);
