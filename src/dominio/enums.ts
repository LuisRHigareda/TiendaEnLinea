// Roles que puede tener un usuario dentro de la tienda.
export enum RolUsuario {
    CLIENTE = 'CLIENTE',
    ADMINISTRADOR = 'ADMINISTRADOR',
}


// Estados por los que puede pasar una orden.
export enum EstadoOrden {
    PENDIENTE = 'PENDIENTE',
    PROCESANDO = 'PROCESANDO',
    ENVIADO = 'ENVIADO',
    ENTREGADO = 'ENTREGADO',
}


// Tallas disponibles para las variantes de los productos.
export enum Talla {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XXL = 'XXL',
}


// Colores que pueden tener las variantes.
export enum Color {
    NEGRO = 'NEGRO',
    BLANCO = 'BLANCO',
    GRIS = 'GRIS',
    AZUL = 'AZUL',
    ROJO = 'ROJO',
    VERDE = 'VERDE',
    BEIGE = 'BEIGE',
}


// Formas de pago que podrá registrar una orden.
export enum MetodoPago {
    TARJETA = 'TARJETA',
    EFECTIVO = 'EFECTIVO',
    TRANSFERENCIA = 'TRANSFERENCIA',
}


// Estado actual del pago de una orden.
export enum EstadoPago {
    PENDIENTE = 'PENDIENTE',
    PAGADO = 'PAGADO',
    FALLIDO = 'FALLIDO',
}


// Razones por las que un administrador puede mover inventario.
export enum MotivoAjuste {
    ENTRADA = 'ENTRADA',
    MERMA = 'MERMA',
    CORRECCION = 'CORRECCION',
}