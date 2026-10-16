import {
    EstadoOrden,
    EstadoPago,
    MetodoPago,
    MotivoAjuste,
} from './dominio/enums.js';

import {
    ErrorDeDominio,
} from './dominio/errores.js';

import {
    TiendaService,
} from './dominio/services/tienda.service.js';

import {
    AjusteInventarioMemoriaRepository,
} from './infra/memoria/ajuste-inventario-memoria.repository.js';

import {
    CarritoMemoriaRepository,
} from './infra/memoria/carrito-memoria.repository.js';

import {
    DireccionMemoriaRepository,
} from './infra/memoria/direccion-memoria.repository.js';

import {
    EnvioMemoriaRepository,
} from './infra/memoria/envio-memoria.repository.js';

import {
    OrdenMemoriaRepository,
} from './infra/memoria/orden-memoria.repository.js';

import {
    PagoMemoriaRepository,
} from './infra/memoria/pago-memoria.repository.js';

import {
    ProductoMemoriaRepository,
} from './infra/memoria/producto-memoria.repository.js';

import {
    UsuarioMemoriaRepository,
} from './infra/memoria/usuario-memoria.repository.js';

import {
    VarianteProductoMemoriaRepository,
} from './infra/memoria/variante-producto-memoria.repository.js';


const productos =
    new ProductoMemoriaRepository();

const variantes =
    new VarianteProductoMemoriaRepository();

const usuarios =
    new UsuarioMemoriaRepository();

const carritos =
    new CarritoMemoriaRepository();

const ordenes =
    new OrdenMemoriaRepository();

const direcciones =
    new DireccionMemoriaRepository();

const pagos =
    new PagoMemoriaRepository();

const envios =
    new EnvioMemoriaRepository();

const ajustes =
    new AjusteInventarioMemoriaRepository();


const tienda =
    new TiendaService(
        productos,
        variantes,
        usuarios,
        carritos,
        ordenes,
        direcciones,
        pagos,
        envios,
        ajustes,
    );


function mostrarError(
    error: unknown,
) {

    if (
        error instanceof
        ErrorDeDominio
    ) {
        console.log(
            `ERROR DE DOMINIO: ${error.message}`,
        );

        return;
    }

    console.error(error);
}


async function ejecutar() {

    console.log(
        '\n=== ESCENARIO 1: COMPRA VÁLIDA ===',
    );

    try {

        const item =
            await tienda.agregarAlCarrito(
                1,
                1,
                2,
            );

        console.log(
            'Producto agregado correctamente.',
        );

        console.log(
            'Cantidad:',
            item.cantidad,
        );

        const carrito =
            await tienda.consultarCarrito(
                1,
            );

        console.log(
            'Total del carrito:',
            carrito.total,
        );

    } catch (error) {
        mostrarError(error);
    }


    console.log(
        '\n=== ESCENARIO 2: STOCK INSUFICIENTE ===',
    );

    try {

        await tienda.agregarAlCarrito(
            1,
            2,
            5,
        );

    } catch (error) {
        mostrarError(error);
    }


    console.log(
        '\n=== ESCENARIO 3: PRODUCTO INACTIVO ===',
    );

    try {

        await tienda.agregarAlCarrito(
            1,
            3,
            1,
        );

    } catch (error) {
        mostrarError(error);
    }


    console.log(
        '\n=== CREAR ORDEN ===',
    );

    try {

        const resultado =
            await tienda.confirmarCompra(
                1,
                1,
                MetodoPago.TARJETA,
            );

        console.log(
            'Orden creada:',
            resultado.orden.id,
        );

        console.log(
            'Estado:',
            resultado.orden.estado,
        );

        console.log(
            'Pago:',
            resultado.pago.estado,
        );


        console.log(
            '\n=== CLIENTE INTENTA CAMBIAR ESTADO ===',
        );

        try {

            await tienda.cambiarEstadoOrden(
                1,
                resultado.orden.id,
                EstadoOrden.PROCESANDO,
            );

        } catch (error) {
            mostrarError(error);
        }


        console.log(
            '\n=== ADMIN INTENTA PROCESAR SIN PAGO ===',
        );

        try {

            await tienda.cambiarEstadoOrden(
                2,
                resultado.orden.id,
                EstadoOrden.PROCESANDO,
            );

        } catch (error) {
            mostrarError(error);
        }


        console.log(
            '\n=== CONFIRMAR PAGO ===',
        );

        await tienda.cambiarEstadoPago(
            resultado.orden.id,
            EstadoPago.PAGADO,
        );

        console.log(
            'Pago confirmado.',
        );


        console.log(
            '\n=== ORDEN EN PROCESO ===',
        );

        const procesando =
            await tienda.cambiarEstadoOrden(
                2,
                resultado.orden.id,
                EstadoOrden.PROCESANDO,
            );

        console.log(
            'Estado:',
            procesando.estado,
        );


        console.log(
            '\n=== INTENTO DE SALTAR A ENTREGADO ===',
        );

        try {

            await tienda.cambiarEstadoOrden(
                2,
                resultado.orden.id,
                EstadoOrden.ENTREGADO,
            );

        } catch (error) {
            mostrarError(error);
        }


        console.log(
            '\n=== REGISTRAR ENVÍO ===',
        );

        const envio =
            await tienda.registrarEnvio(
                2,
                resultado.orden.id,
                'Paquetería de prueba',
                'GUIA-001',
            );

        console.log(
            'Paquetería:',
            envio.nombrePaqueteria,
        );

        console.log(
            'Guía:',
            envio.numeroGuia,
        );


        console.log(
            '\n=== ORDEN ENVIADA ===',
        );

        const enviada =
            await tienda.cambiarEstadoOrden(
                2,
                resultado.orden.id,
                EstadoOrden.ENVIADO,
            );

        console.log(
            'Estado:',
            enviada.estado,
        );


        console.log(
            '\n=== ORDEN ENTREGADA ===',
        );

        const entregada =
            await tienda.cambiarEstadoOrden(
                2,
                resultado.orden.id,
                EstadoOrden.ENTREGADO,
            );

        console.log(
            'Estado:',
            entregada.estado,
        );


        const envioFinal =
            await tienda.consultarEnvio(
                resultado.orden.id,
            );

        console.log(
            'Fecha de entrega:',
            envioFinal.fechaEntrega,
        );

    } catch (error) {
        mostrarError(error);
    }


    console.log(
        '\n=== PERMISOS DE INVENTARIO ===',
    );

    try {

        await tienda.ajustarInventario(
            1,
            2,
            2,
            MotivoAjuste.ENTRADA,
        );

    } catch (error) {
        mostrarError(error);
    }


    try {

        const ajuste =
            await tienda.ajustarInventario(
                2,
                2,
                2,
                MotivoAjuste.ENTRADA,
            );

        console.log(
            'Ajuste realizado por administrador.',
        );

        console.log(
            'Cantidad:',
            ajuste.cantidad,
        );

        console.log(
            'Motivo:',
            ajuste.motivo,
        );

    } catch (error) {
        mostrarError(error);
    }
}


ejecutar();