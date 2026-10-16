import type {
    Carrito,
    ItemCarrito,
} from '../entidades.js';


// El repositorio del carrito también administra sus items.
export interface CarritoRepository {

    buscarPorUsuarioId(
        usuarioId: number,
    ): Promise<Carrito | null>;

    guardar(
        carrito: Carrito,
    ): Promise<Carrito>;

    listarItems(
        carritoId: number,
    ): Promise<ItemCarrito[]>;

    buscarItemPorVariante(
        carritoId: number,
        varianteId: number,
    ): Promise<ItemCarrito | null>;

    guardarItem(
        item: ItemCarrito,
    ): Promise<ItemCarrito>;

    actualizarItem(
        item: ItemCarrito,
    ): Promise<ItemCarrito | null>;

    eliminarItem(
        itemId: number,
    ): Promise<boolean>;

    vaciar(
        carritoId: number,
    ): Promise<void>;
}