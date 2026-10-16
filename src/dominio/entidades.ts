import {
    Color,
    EstadoOrden,
    EstadoPago,
    MetodoPago,
    MotivoAjuste,
    RolUsuario,
    Talla,
} from './enums.js';


// Persona registrada dentro del sistema.
export interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    contrasenaHash: string;
    rol: RolUsuario;
    telefono: string;
}


// Dirección guardada por un usuario.
export interface Direccion {
    id: number;
    usuarioId: number;
    codigoPostal: string;
    numeroCasa: string;
    calle: string;
    colonia: string;
    ciudad: string;
    estado: string;
}


// Clasificación utilizada para organizar los productos.
export interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
}


// Información general de una prenda.
// La talla, color y existencia ahora pertenecen a sus variantes.
export interface Producto {
    id: number;
    categoriaId: number;
    nombre: string;
    descripcion: string;
    precio: number;
    activo: boolean;
    imagen: string;
}


// Combinación vendible de un producto.
// Cada talla y color puede tener su propio inventario.
export interface VarianteProducto {
    id: number;
    productoId: number;
    talla: Talla;
    color: Color;
    stock: number;
    stockMinimo: number;
}


// Carrito perteneciente a un usuario.
export interface Carrito {
    id: number;
    usuarioId: number;
}


// Producto seleccionado dentro de un carrito.
// Se referencia la variante porque esa es la que tiene stock.
export interface ItemCarrito {
    id: number;
    carritoId: number;
    varianteId: number;
    cantidad: number;
}


// Compra realizada por un usuario.
export interface Orden {
    id: number;
    usuarioId: number;
    direccionId: number;
    fecha: Date;
    total: number;
    estado: EstadoOrden;
}


// Producto que quedó registrado dentro de una orden.
export interface DetalleOrden {
    id: number;
    ordenId: number;
    varianteId: number;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}


// Información del pago asociado a una orden.
export interface Pago {
    id: number;
    ordenId: number;
    metodo: MetodoPago;
    estado: EstadoPago;
    monto: number;
}


// Información necesaria para dar seguimiento al envío.
export interface Envio {
    id: number;
    ordenId: number;
    nombrePaqueteria: string;
    numeroGuia: string;
    fechaEnvio: Date;

    // Mientras el paquete siga en camino todavía no habrá fecha.
    fechaEntrega: Date | null;
}


// Registro de un movimiento manual de inventario.
export interface AjusteInventario {
    id: number;
    varianteId: number;
    usuarioId: number;
    fecha: Date;
    cantidad: number;
    motivo: MotivoAjuste;
}