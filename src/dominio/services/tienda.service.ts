import type {
    Carrito,
    DetalleOrden,
    ItemCarrito,
    Orden,
    Producto,
} from '../entidades.js';

import { EstadoOrden } from '../enums.js';

import type { ProductoRepository } from '../repositories/producto.repository.js';

import {
    CantidadInvalidaError,
    CarritoVacioError,
    ProductoInactivoError,
    ProductoNoEncontradoError,
    StockInsuficienteError,
} from '../errores.js';

export class TiendaService {
    private readonly carrito: Carrito = {
        id: 1,
        usuarioId: 1,
    };

    private readonly items: ItemCarrito[] = [];

    private siguienteItemId = 1;
    private siguienteOrdenId = 1;
    private siguienteDetalleId = 1;

    constructor(
        private readonly productoRepository: ProductoRepository,
    ) { }

    async listarProductosDisponibles(): Promise<Producto[]> {
        const productos = await this.productoRepository.listar();

        return productos.filter(
            (producto) => producto.activo && producto.stock > 0,
        );
    }

    async agregarAlCarrito(
        productoId: number,
        cantidad: number,
    ): Promise<{
        producto: Producto;
        item: ItemCarrito;
        subtotal: number;
    }> {
        if (cantidad < 1) {
            throw new CantidadInvalidaError();
        }

        const producto =
            await this.productoRepository.buscarPorId(productoId);

        if (producto === null) {
            throw new ProductoNoEncontradoError(productoId);
        }

        if (!producto.activo) {
            throw new ProductoInactivoError();
        }

        const itemExistente = this.items.find(
            (item) => item.productoId === productoId,
        );

        const cantidadActual = itemExistente?.cantidad ?? 0;
        const nuevaCantidad = cantidadActual + cantidad;

        if (nuevaCantidad > producto.stock) {
            throw new StockInsuficienteError(
                nuevaCantidad,
                producto.stock,
            );
        }

        let item: ItemCarrito;

        if (itemExistente !== undefined) {
            itemExistente.cantidad = nuevaCantidad;
            item = itemExistente;
        } else {
            item = {
                id: this.siguienteItemId++,
                productoId,
                cantidad,
            };

            this.items.push(item);
        }

        return {
            producto,
            item,
            subtotal: producto.precio * item.cantidad,
        };
    }

    obtenerItems(): ItemCarrito[] {
        return this.items.map((item) => ({ ...item }));
    }

    async confirmarCompra(): Promise<{
        orden: Orden;
        detalles: DetalleOrden[];
    }> {
        if (this.items.length === 0) {
            throw new CarritoVacioError();
        }

        const productosConfirmados: {
            item: ItemCarrito;
            producto: Producto;
        }[] = [];

        // Primero se verifica todo el carrito antes de modificar el inventario.
        for (const item of this.items) {
            const producto =
                await this.productoRepository.buscarPorId(
                    item.productoId,
                );

            if (producto === null) {
                throw new ProductoNoEncontradoError(
                    item.productoId,
                );
            }

            if (!producto.activo) {
                throw new ProductoInactivoError();
            }

            if (item.cantidad > producto.stock) {
                throw new StockInsuficienteError(
                    item.cantidad,
                    producto.stock,
                );
            }

            productosConfirmados.push({
                item,
                producto,
            });
        }

        const detalles: DetalleOrden[] =
            productosConfirmados.map(
                ({ item, producto }) => ({
                    id: this.siguienteDetalleId++,
                    productoId: producto.id,
                    cantidad: item.cantidad,
                    precioUnitario: producto.precio,
                    subtotal: producto.precio * item.cantidad,
                }),
            );

        const total = detalles.reduce(
            (acumulado, detalle) =>
                acumulado + detalle.subtotal,
            0,
        );

        // Después de validar todos los productos se descuenta el inventario.
        for (const { item, producto } of productosConfirmados) {
            producto.stock -= item.cantidad;

            await this.productoRepository.actualizar(producto);
        }

        const orden: Orden = {
            id: this.siguienteOrdenId++,
            usuarioId: this.carrito.usuarioId,
            fecha: new Date(),
            total,
            estado: EstadoOrden.PENDIENTE,
        };

        this.items.length = 0;

        return {
            orden,
            detalles,
        };
    }
}