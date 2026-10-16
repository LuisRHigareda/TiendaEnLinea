import type {
    AjusteInventario,
    DetalleOrden,
    Envio,
    ItemCarrito,
    Orden,
    Pago,
    Producto,
} from '../entidades.js';

import {
    EstadoOrden,
    EstadoPago,
    MetodoPago,
    MotivoAjuste,
    RolUsuario,
} from '../enums.js';

import {
    CantidadInvalidaError,
    CarritoNoEncontradoError,
    CarritoVacioError,
    DireccionNoEncontradaError,
    DireccionNoPerteneceAlUsuarioError,
    OrdenNoEncontradaError,
    PagoPendienteError,
    PermisoDenegadoError,
    ProductoInactivoError,
    ProductoNoEncontradoError,
    StockInsuficienteError,
    StockNegativoError,
    TransicionOrdenInvalidaError,
    UsuarioNoEncontradoError,
    VarianteNoEncontradaError,
    EnvioNoEncontradoError,
    EnvioYaRegistradoError,
    PrecioInvalidoError,
} from '../errores.js';

import type {
    AjusteInventarioRepository,
} from '../repositories/ajuste-inventario.repository.js';

import type {
    CarritoRepository,
} from '../repositories/carrito.repository.js';

import type {
    DireccionRepository,
} from '../repositories/direccion.repository.js';

import type {
    OrdenRepository,
} from '../repositories/orden.repository.js';

import type {
    PagoRepository,
} from '../repositories/pago.repository.js';

import type {
    ProductoRepository,
} from '../repositories/producto.repository.js';

import type {
    UsuarioRepository,
} from '../repositories/usuario.repository.js';

import type {
    VarianteProductoRepository,
} from '../repositories/variante-producto.repository.js';

import type {
    EnvioRepository,
} from '../repositories/envio.repository.js';

export class TiendaService {

    constructor(
        private readonly productos:
            ProductoRepository,

        private readonly variantes:
            VarianteProductoRepository,

        private readonly usuarios:
            UsuarioRepository,

        private readonly carritos:
            CarritoRepository,

        private readonly ordenes:
            OrdenRepository,

        private readonly direcciones:
            DireccionRepository,

        private readonly pagos:
            PagoRepository,

        private readonly envios:
            EnvioRepository,

        private readonly ajustes:
            AjusteInventarioRepository,
    ) { }


    // Devuelve únicamente los productos activos.
    async consultarCatalogo():
        Promise<Producto[]> {

        const productos =
            await this.productos.listar();

        return productos.filter(
            (producto) =>
                producto.activo,
        );
    }


    // Agrega una variante al carrito de un usuario.
    async agregarAlCarrito(
        usuarioId: number,
        varianteId: number,
        cantidad: number,
    ): Promise<ItemCarrito> {

        if (cantidad < 1) {
            throw new CantidadInvalidaError();
        }


        const usuario =
            await this.usuarios.buscarPorId(
                usuarioId,
            );

        if (!usuario) {
            throw new UsuarioNoEncontradoError();
        }


        const carrito =
            await this.carritos.buscarPorUsuarioId(
                usuarioId,
            );

        if (!carrito) {
            throw new CarritoNoEncontradoError();
        }


        const variante =
            await this.variantes.buscarPorId(
                varianteId,
            );

        if (!variante) {
            throw new VarianteNoEncontradaError();
        }


        const producto =
            await this.productos.buscarPorId(
                variante.productoId,
            );

        if (!producto) {
            throw new ProductoNoEncontradoError();
        }


        if (!producto.activo) {
            throw new ProductoInactivoError();
        }


        const existente =
            await this.carritos
                .buscarItemPorVariante(
                    carrito.id,
                    varianteId,
                );


        const cantidadActual =
            existente?.cantidad ?? 0;

        const nuevaCantidad =
            cantidadActual + cantidad;


        if (
            nuevaCantidad >
            variante.stock
        ) {
            throw new StockInsuficienteError(
                nuevaCantidad,
                variante.stock,
            );
        }


        // Si ya estaba en el carrito actualizamos la cantidad.
        if (existente) {

            existente.cantidad =
                nuevaCantidad;

            const actualizado =
                await this.carritos
                    .actualizarItem(
                        existente,
                    );

            return actualizado!;
        }


        // Si todavía no estaba, guardamos un item nuevo.
        return this.carritos.guardarItem({
            id: 0,
            carritoId: carrito.id,
            varianteId,
            cantidad,
        });
    }


    // Consulta el carrito y calcula su total.
    async consultarCarrito(
        usuarioId: number,
    ) {

        const carrito =
            await this.carritos.buscarPorUsuarioId(
                usuarioId,
            );

        if (!carrito) {
            throw new CarritoNoEncontradoError();
        }


        const items =
            await this.carritos.listarItems(
                carrito.id,
            );


        let total = 0;


        for (const item of items) {

            const variante =
                await this.variantes.buscarPorId(
                    item.varianteId,
                );

            if (!variante) {
                throw new VarianteNoEncontradaError();
            }


            const producto =
                await this.productos.buscarPorId(
                    variante.productoId,
                );

            if (!producto) {
                throw new ProductoNoEncontradoError();
            }


            total +=
                producto.precio *
                item.cantidad;
        }


        return {
            carrito,
            items,
            total,
        };
    }


    // Genera una orden a partir del carrito actual.
    async confirmarCompra(
        usuarioId: number,
        direccionId: number,
        metodoPago: MetodoPago,
    ): Promise<{
        orden: Orden;
        pago: Pago;
    }> {

        const usuario =
            await this.usuarios.buscarPorId(
                usuarioId,
            );

        if (!usuario) {
            throw new UsuarioNoEncontradoError();
        }


        const direccion =
            await this.direcciones.buscarPorId(
                direccionId,
            );

        if (!direccion) {
            throw new DireccionNoEncontradaError();
        }


        if (
            direccion.usuarioId !==
            usuarioId
        ) {
            throw new DireccionNoPerteneceAlUsuarioError();
        }


        const carrito =
            await this.carritos.buscarPorUsuarioId(
                usuarioId,
            );

        if (!carrito) {
            throw new CarritoNoEncontradoError();
        }


        const items =
            await this.carritos.listarItems(
                carrito.id,
            );

        if (items.length === 0) {
            throw new CarritoVacioError();
        }


        const detalles:
            DetalleOrden[] = [];

        let total = 0;


        // Primero comprobamos todo el carrito.
        for (const item of items) {

            const variante =
                await this.variantes.buscarPorId(
                    item.varianteId,
                );

            if (!variante) {
                throw new VarianteNoEncontradaError();
            }


            const producto =
                await this.productos.buscarPorId(
                    variante.productoId,
                );

            if (!producto) {
                throw new ProductoNoEncontradoError();
            }


            if (!producto.activo) {
                throw new ProductoInactivoError();
            }


            if (
                item.cantidad >
                variante.stock
            ) {
                throw new StockInsuficienteError(
                    item.cantidad,
                    variante.stock,
                );
            }


            const subtotal =
                producto.precio *
                item.cantidad;


            total += subtotal;


            detalles.push({
                id: 0,
                ordenId: 0,
                varianteId:
                    variante.id,
                cantidad:
                    item.cantidad,
                precioUnitario:
                    producto.precio,
                subtotal,
            });
        }


        // Después de validar todo, descontamos existencias.
        for (const item of items) {

            const variante =
                await this.variantes.buscarPorId(
                    item.varianteId,
                );

            if (!variante) {
                throw new VarianteNoEncontradaError();
            }


            variante.stock -=
                item.cantidad;


            await this.variantes.actualizar(
                variante,
            );
        }


        // La orden siempre inicia pendiente.
        const orden =
            await this.ordenes.guardar(
                {
                    id: 0,
                    usuarioId,
                    direccionId,
                    fecha: new Date(),
                    total,
                    estado:
                        EstadoOrden.PENDIENTE,
                },
                detalles,
            );


        // Toda orden registra su pago.
        // Al inicio todavía está pendiente.
        const pago =
            await this.pagos.guardar({
                id: 0,
                ordenId: orden.id,
                metodo: metodoPago,
                estado:
                    EstadoPago.PENDIENTE,
                monto: total,
            });


        // Una vez confirmada la compra limpiamos el carrito.
        await this.carritos.vaciar(
            carrito.id,
        );


        return {
            orden,
            pago,
        };
    }


    // Simula el resultado del pago.
    // Más adelante este caso quedará detrás de la API.
    async cambiarEstadoPago(
        ordenId: number,
        estado: EstadoPago,
    ): Promise<Pago> {

        const pago =
            await this.pagos.buscarPorOrdenId(
                ordenId,
            );

        if (!pago) {
            throw new PagoPendienteError();
        }


        pago.estado =
            estado;


        const actualizado =
            await this.pagos.actualizar(
                pago,
            );


        return actualizado!;
    }

    // Registra los datos de envío de una orden.
    // Solamente un administrador puede hacerlo.
    async registrarEnvio(
        usuarioId: number,
        ordenId: number,
        nombrePaqueteria: string,
        numeroGuia: string,
    ): Promise<Envio> {

        const usuario =
            await this.usuarios.buscarPorId(
                usuarioId,
            );

        if (!usuario) {
            throw new UsuarioNoEncontradoError();
        }


        if (
            usuario.rol !==
            RolUsuario.ADMINISTRADOR
        ) {
            throw new PermisoDenegadoError();
        }


        const orden =
            await this.ordenes.buscarPorId(
                ordenId,
            );

        if (!orden) {
            throw new OrdenNoEncontradaError();
        }


        // El envío se registra cuando la orden ya está procesándose.
        if (
            orden.estado !==
            EstadoOrden.PROCESANDO
        ) {
            throw new TransicionOrdenInvalidaError();
        }


        const existente =
            await this.envios.buscarPorOrdenId(
                ordenId,
            );

        if (existente) {
            throw new EnvioYaRegistradoError();
        }


        return this.envios.guardar({
            id: 0,
            ordenId,
            nombrePaqueteria,
            numeroGuia,
            fechaEnvio: new Date(),
            fechaEntrega: null,
        });
    }


    // Consulta la información de envío de una orden.
    async consultarEnvio(
        ordenId: number,
    ): Promise<Envio> {

        const envio =
            await this.envios.buscarPorOrdenId(
                ordenId,
            );

        if (!envio) {
            throw new EnvioNoEncontradoError();
        }

        return envio;
    }

    // Cambiar el estado de la orden es una operación administrativa.
    async cambiarEstadoOrden(
        usuarioId: number,
        ordenId: number,
        nuevoEstado: EstadoOrden,
    ): Promise<Orden> {

        const usuario =
            await this.usuarios.buscarPorId(
                usuarioId,
            );

        if (!usuario) {
            throw new UsuarioNoEncontradoError();
        }


        if (
            usuario.rol !==
            RolUsuario.ADMINISTRADOR
        ) {
            throw new PermisoDenegadoError();
        }


        const orden =
            await this.ordenes.buscarPorId(
                ordenId,
            );

        if (!orden) {
            throw new OrdenNoEncontradaError();
        }


        // Para pasar a procesando debe existir un pago exitoso.
        if (
            orden.estado ===
            EstadoOrden.PENDIENTE &&
            nuevoEstado ===
            EstadoOrden.PROCESANDO
        ) {

            const pago =
                await this.pagos
                    .buscarPorOrdenId(
                        orden.id,
                    );


            if (
                !pago ||
                pago.estado !==
                EstadoPago.PAGADO
            ) {
                throw new PagoPendienteError();
            }
        }

        // Para marcar una orden como enviada ya debe existir
        // la paquetería y el número de guía.
        if (
            orden.estado ===
            EstadoOrden.PROCESANDO &&
            nuevoEstado ===
            EstadoOrden.ENVIADO
        ) {

            const envio =
                await this.envios.buscarPorOrdenId(
                    orden.id,
                );

            if (!envio) {
                throw new EnvioNoEncontradoError();
            }
        }

        const siguiente:
            Partial<
                Record<
                    EstadoOrden,
                    EstadoOrden
                >
            > = {

            [EstadoOrden.PENDIENTE]:
                EstadoOrden.PROCESANDO,

            [EstadoOrden.PROCESANDO]:
                EstadoOrden.ENVIADO,

            [EstadoOrden.ENVIADO]:
                EstadoOrden.ENTREGADO,
        };


        if (
            siguiente[orden.estado] !==
            nuevoEstado
        ) {
            throw new TransicionOrdenInvalidaError();
        }


        orden.estado =
            nuevoEstado;


        const actualizada =
            await this.ordenes.actualizar(
                orden,
            );

        // Al marcar la orden como entregada
        // guardamos también la fecha de entrega.
        if (
            nuevoEstado ===
            EstadoOrden.ENTREGADO
        ) {

            const envio =
                await this.envios.buscarPorOrdenId(
                    orden.id,
                );

            if (!envio) {
                throw new EnvioNoEncontradoError();
            }


            envio.fechaEntrega =
                new Date();


            await this.envios.actualizar(
                envio,
            );
        }
        return actualizada!;
    }

    // Registrar productos es una operación administrativa.
    async registrarProducto(
        usuarioId: number,
        producto: Producto,
    ): Promise<Producto> {

        const usuario =
            await this.usuarios.buscarPorId(
                usuarioId,
            );

        if (!usuario) {
            throw new UsuarioNoEncontradoError();
        }


        if (
            usuario.rol !==
            RolUsuario.ADMINISTRADOR
        ) {
            throw new PermisoDenegadoError();
        }


        if (producto.precio <= 0) {
            throw new PrecioInvalidoError();
        }


        return this.productos.guardar(
            producto,
        );
    }


    // Modificar el catálogo también requiere administrador.
    async modificarProducto(
        usuarioId: number,
        producto: Producto,
    ): Promise<Producto> {

        const usuario =
            await this.usuarios.buscarPorId(
                usuarioId,
            );

        if (!usuario) {
            throw new UsuarioNoEncontradoError();
        }


        if (
            usuario.rol !==
            RolUsuario.ADMINISTRADOR
        ) {
            throw new PermisoDenegadoError();
        }


        if (producto.precio <= 0) {
            throw new PrecioInvalidoError();
        }


        const existente =
            await this.productos.buscarPorId(
                producto.id,
            );

        if (!existente) {
            throw new ProductoNoEncontradoError();
        }


        const actualizado =
            await this.productos.actualizar(
                producto,
            );


        return actualizado!;
    }

    // Los movimientos manuales de inventario solamente los hace un admin.
    async ajustarInventario(
        usuarioId: number,
        varianteId: number,
        cantidad: number,
        motivo: MotivoAjuste,
    ): Promise<AjusteInventario> {

        const usuario =
            await this.usuarios.buscarPorId(
                usuarioId,
            );

        if (!usuario) {
            throw new UsuarioNoEncontradoError();
        }


        if (
            usuario.rol !==
            RolUsuario.ADMINISTRADOR
        ) {
            throw new PermisoDenegadoError();
        }


        const variante =
            await this.variantes.buscarPorId(
                varianteId,
            );

        if (!variante) {
            throw new VarianteNoEncontradaError();
        }


        const nuevoStock =
            variante.stock +
            cantidad;


        if (nuevoStock < 0) {
            throw new StockNegativoError();
        }


        variante.stock =
            nuevoStock;


        await this.variantes.actualizar(
            variante,
        );


        // Además de modificar el stock guardamos quién hizo el movimiento.
        return this.ajustes.guardar({
            id: 0,
            varianteId,
            usuarioId,
            fecha: new Date(),
            cantidad,
            motivo,
        });
    }
}