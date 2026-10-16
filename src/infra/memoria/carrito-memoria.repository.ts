import type {
    Carrito,
    ItemCarrito,
} from '../../dominio/entidades.js';

import type {
    CarritoRepository,
} from '../../dominio/repositories/carrito.repository.js';


export class CarritoMemoriaRepository
    implements CarritoRepository {

    private readonly carritos: Carrito[] = [
        {
            id: 1,
            usuarioId: 1,
        },
    ];

    private readonly items: ItemCarrito[] = [];

    private siguienteItemId = 1;


    async buscarPorUsuarioId(
        usuarioId: number,
    ): Promise<Carrito | null> {

        const carrito =
            this.carritos.find(
                (actual) =>
                    actual.usuarioId === usuarioId,
            );

        return carrito
            ? { ...carrito }
            : null;
    }


    async guardar(
        carrito: Carrito,
    ): Promise<Carrito> {

        this.carritos.push({
            ...carrito,
        });

        return {
            ...carrito,
        };
    }


    async listarItems(
        carritoId: number,
    ): Promise<ItemCarrito[]> {

        return this.items
            .filter(
                (item) =>
                    item.carritoId === carritoId,
            )
            .map(
                (item) => ({
                    ...item,
                }),
            );
    }


    async buscarItemPorVariante(
        carritoId: number,
        varianteId: number,
    ): Promise<ItemCarrito | null> {

        const item =
            this.items.find(
                (actual) =>
                    actual.carritoId === carritoId &&
                    actual.varianteId === varianteId,
            );

        return item
            ? { ...item }
            : null;
    }


    async guardarItem(
        item: ItemCarrito,
    ): Promise<ItemCarrito> {

        const nuevo: ItemCarrito = {
            ...item,
            id: item.id || this.siguienteItemId++,
        };

        this.items.push(nuevo);

        return {
            ...nuevo,
        };
    }


    async actualizarItem(
        item: ItemCarrito,
    ): Promise<ItemCarrito | null> {

        const indice =
            this.items.findIndex(
                (actual) =>
                    actual.id === item.id,
            );

        if (indice === -1) {
            return null;
        }

        this.items[indice] = {
            ...item,
        };

        return {
            ...item,
        };
    }


    async eliminarItem(
        itemId: number,
    ): Promise<boolean> {

        const indice =
            this.items.findIndex(
                (item) =>
                    item.id === itemId,
            );

        if (indice === -1) {
            return false;
        }

        this.items.splice(
            indice,
            1,
        );

        return true;
    }


    async vaciar(
        carritoId: number,
    ): Promise<void> {

        for (
            let i = this.items.length - 1;
            i >= 0;
            i--
        ) {
            if (
                this.items[i].carritoId ===
                carritoId
            ) {
                this.items.splice(
                    i,
                    1,
                );
            }
        }
    }
}