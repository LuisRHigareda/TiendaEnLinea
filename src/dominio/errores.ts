// Clase base para todos los errores propios del dominio.
export abstract class ErrorDeDominio extends Error {

    constructor(mensaje: string) {
        super(mensaje);
        this.name = new.target.name;
    }
}


// No se encontró el usuario solicitado.
export class UsuarioNoEncontradoError
extends ErrorDeDominio {

    constructor() {
        super(
            'El usuario no existe.',
        );
    }
}


// No se encontró el producto solicitado.
export class ProductoNoEncontradoError
extends ErrorDeDominio {

    constructor() {
        super(
            'El producto no existe.',
        );
    }
}


// No se encontró la variante solicitada.
export class VarianteNoEncontradaError
extends ErrorDeDominio {

    constructor() {
        super(
            'La variante del producto no existe.',
        );
    }
}


// El producto existe, pero no está disponible para compra.
export class ProductoInactivoError
extends ErrorDeDominio {

    constructor() {
        super(
            'El producto seleccionado no se encuentra disponible para compra.',
        );
    }
}


// La cantidad debe ser al menos de una unidad.
export class CantidadInvalidaError
extends ErrorDeDominio {

    constructor() {
        super(
            'La cantidad solicitada debe ser de al menos una unidad.',
        );
    }
}


// Se intentó comprar más de lo disponible.
export class StockInsuficienteError
extends ErrorDeDominio {

    constructor(
        solicitado: number,
        disponible: number,
    ) {
        super(
            `No es posible agregar ${solicitado} unidades. Stock disponible: ${disponible}.`,
        );
    }
}


// El usuario todavía no tiene un carrito.
export class CarritoNoEncontradoError
extends ErrorDeDominio {

    constructor() {
        super(
            'No se encontró el carrito del usuario.',
        );
    }
}


// No se puede generar una orden sin productos.
export class CarritoVacioError
extends ErrorDeDominio {

    constructor() {
        super(
            'No se puede confirmar una compra con el carrito vacío.',
        );
    }
}


// La dirección indicada no existe.
export class DireccionNoEncontradaError
extends ErrorDeDominio {

    constructor() {
        super(
            'La dirección indicada no existe.',
        );
    }
}


// Evita utilizar la dirección de otro usuario.
export class DireccionNoPerteneceAlUsuarioError
extends ErrorDeDominio {

    constructor() {
        super(
            'La dirección seleccionada no pertenece al usuario.',
        );
    }
}


// No se encontró la orden.
export class OrdenNoEncontradaError
extends ErrorDeDominio {

    constructor() {
        super(
            'La orden no existe.',
        );
    }
}


// Evita saltarse estados de una orden.
export class TransicionOrdenInvalidaError
extends ErrorDeDominio {

    constructor() {
        super(
            'El cambio de estado de la orden no está permitido.',
        );
    }
}


// Una orden no puede procesarse mientras el pago siga pendiente.
export class PagoPendienteError
extends ErrorDeDominio {

    constructor() {
        super(
            'La orden no puede procesarse mientras el pago no esté confirmado.',
        );
    }
}


// Se utiliza cuando un usuario intenta realizar una operación administrativa.
export class PermisoDenegadoError
extends ErrorDeDominio {

    constructor() {
        super(
            'El usuario no tiene permiso para realizar esta operación.',
        );
    }
}


// Evita que un ajuste deje el inventario en números negativos.
export class StockNegativoError
extends ErrorDeDominio {

    constructor() {
        super(
            'El ajuste dejaría el inventario con una existencia menor que cero.',
        );
    }
}

// La orden todavía no tiene información de envío.
export class EnvioNoEncontradoError
extends ErrorDeDominio {

    constructor() {
        super(
            'La orden todavía no tiene un envío registrado.',
        );
    }
}


// Evita registrar dos envíos para una misma orden.
export class EnvioYaRegistradoError
extends ErrorDeDominio {

    constructor() {
        super(
            'La orden ya tiene un envío registrado.',
        );
    }
}

// El precio de un producto siempre debe ser mayor que cero.
export class PrecioInvalidoError
extends ErrorDeDominio {

    constructor() {
        super(
            'El precio del producto debe ser mayor que cero.',
        );
    }
}


