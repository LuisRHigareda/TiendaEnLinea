export class ProductoNoEncontradoError extends Error {
    constructor(id: number) {
        super(`No existe el producto con id ${id}.`);
        this.name = 'ProductoNoEncontradoError';
    }
}

export class ProductoInactivoError extends Error {
    constructor() {
        super(
            'El producto seleccionado no se encuentra disponible para compra.',
        );
        this.name = 'ProductoInactivoError';
    }
}

export class StockInsuficienteError extends Error {
    constructor(
        cantidadSolicitada: number,
        stockDisponible: number,
    ) {
        super(
            `No es posible agregar ${cantidadSolicitada} unidades. Stock disponible: ${stockDisponible}.`,
        );
        this.name = 'StockInsuficienteError';
    }
}

export class CantidadInvalidaError extends Error {
    constructor() {
        super('La cantidad solicitada debe ser de al menos una unidad.');
        this.name = 'CantidadInvalidaError';
    }
}

export class CarritoVacioError extends Error {
    constructor() {
        super('No se puede confirmar una compra si el carrito está vacío.');
        this.name = 'CarritoVacioError';
    }
}