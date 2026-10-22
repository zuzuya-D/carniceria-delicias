-- Extensión para generación de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla Local (Andahuaylas - 2 locales)
CREATE TABLE local (
    id_local SERIAL PRIMARY KEY,
    nombre_local VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL
);

-- 2. Tabla Trabajador
CREATE TABLE trabajador (
    id_trabajador UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_local INT NOT NULL REFERENCES local(id_local) ON DELETE CASCADE,
    nombres VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('administrador', 'vendedor', 'operario'))
);

-- 3. Tabla Producto (Cortes de carne)
CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    nombre_corte VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio_mayor_kg NUMERIC(10, 2) NOT NULL,
    precio_menor_kg NUMERIC(10, 2) NOT NULL
);

-- 4. Tabla Stock Inventario por Local
CREATE TABLE stock_inventario (
    id_stock SERIAL PRIMARY KEY,
    id_local INT NOT NULL REFERENCES local(id_local) ON DELETE CASCADE,
    id_producto INT NOT NULL REFERENCES producto(id_producto) ON DELETE CASCADE,
    stock_kilos NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    CONSTRAINT unique_local_producto UNIQUE (id_local, id_producto)
);

-- 5. Tabla Compra de Ganado
CREATE TABLE compra_ganado (
    id_compra SERIAL PRIMARY KEY,
    fecha_compra DATE NOT NULL DEFAULT CURRENT_DATE,
    cantidad_cabezas INT NOT NULL,
    costo_total_ganado NUMERIC(10, 2) NOT NULL
);

-- 6. Tabla Proceso Camal (Cálculo de costo por kilo procesado)
CREATE TABLE proceso_camal (
    id_camal SERIAL PRIMARY KEY,
    id_compra INT NOT NULL REFERENCES compra_ganado(id_compra) ON DELETE CASCADE,
    costo_servicio_camal NUMERIC(10, 2) NOT NULL,
    kilos_obtencion_total NUMERIC(10, 2) NOT NULL
);

-- 7. Tabla Venta
CREATE TABLE venta (
    id_venta SERIAL PRIMARY KEY,
    id_local INT NOT NULL REFERENCES local(id_local),
    id_trabajador UUID NOT NULL REFERENCES trabajador(id_trabajador),
    fecha_hora TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    medio_pago VARCHAR(50) NOT NULL CHECK (medio_pago IN ('Efectivo', 'Yape')),
    tipo_entrega VARCHAR(50) NOT NULL CHECK (tipo_entrega IN ('Mostrador', 'Delivery')),
    tipo_venta VARCHAR(50) NOT NULL CHECK (tipo_venta IN ('Por Mayor', 'Por Menor')),
    total_pagado NUMERIC(10, 2) NOT NULL DEFAULT 0.00
);

-- 8. Tabla Detalle Venta
CREATE TABLE detalle_venta (
    id_detalle SERIAL PRIMARY KEY,
    id_venta INT NOT NULL REFERENCES venta(id_venta) ON DELETE CASCADE,
    id_producto INT NOT NULL REFERENCES producto(id_producto),
    cantidad_kg NUMERIC(10, 2) NOT NULL,
    precio_unitario_kg NUMERIC(10, 2) NOT NULL
);

-- 9. Tabla Asistencia Personal
CREATE TABLE asistencia (
    id_asistencia SERIAL PRIMARY KEY,
    id_trabajador UUID NOT NULL REFERENCES trabajador(id_trabajador) ON DELETE CASCADE,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    hora_ingreso TIME NOT NULL DEFAULT CURRENT_TIME,
    hora_salida TIME NULL
);
