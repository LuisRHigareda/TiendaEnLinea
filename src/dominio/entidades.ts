import {
    Color,
    EstadoOrden,
    RolUsuario,
    Talla,
} from './enums.js';

export interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    rol: RolUsuario;
}

export interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface Producto {
    id: number;
    categoriaId: number;
    nombre: string;
    descripcion: string;
    precio: number;
    talla: Talla;
    color: Color;
    stock: number;
    activo: boolean;
}

export interface Carrito {
    id: number;
    usuarioId: number;
}

export interface ItemCarrito {
    id: number;
    productoId: number;
    cantidad: number;
}

export interface Orden {
    id: number;
    usuarioId: number;
    fecha: Date;
    total: number;
    estado: EstadoOrden;
}

export interface DetalleOrden {
    id: number;
    productoId: number;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}