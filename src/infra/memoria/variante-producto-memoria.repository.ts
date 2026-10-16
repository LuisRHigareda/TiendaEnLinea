import type {
    VarianteProducto,
} from '../../dominio/entidades.js';

import {
    Color,
    Talla,
} from '../../dominio/enums.js';

import type {
    VarianteProductoRepository,
} from '../../dominio/repositories/variante-producto.repository.js';


export class VarianteProductoMemoriaRepository
    implements VarianteProductoRepository {

    // Conservamos los tres escenarios que ya tenía el Avance 1.
    private readonly variantes: VarianteProducto[] = [
        {
            id: 1,
            productoId: 1,
            talla: Talla.M,
            color: Color.NEGRO,
            stock: 10,
            stockMinimo: 2,
        },
        {
            id: 2,
            productoId: 2,
            talla: Talla.L,
            color: Color.GRIS,
            stock: 3,
            stockMinimo: 1,
        },
        {
            id: 3,
            productoId: 3,
            talla: Talla.M,
            color: Color.NEGRO,
            stock: 5,
            stockMinimo: 1,
        },
    ];


    async listar(): Promise<VarianteProducto[]> {
        return this.variantes.map(
            (variante) => ({
                ...variante,
            }),
        );
    }


    async listarPorProducto(
        productoId: number,
    ): Promise<VarianteProducto[]> {

        return this.variantes
            .filter(
                (variante) =>
                    variante.productoId === productoId,
            )
            .map(
                (variante) => ({
                    ...variante,
                }),
            );
    }


    async buscarPorId(
        id: number,
    ): Promise<VarianteProducto | null> {

        const variante =
            this.variantes.find(
                (actual) =>
                    actual.id === id,
            );

        return variante
            ? { ...variante }
            : null;
    }


    async guardar(
        variante: VarianteProducto,
    ): Promise<VarianteProducto> {

        this.variantes.push({
            ...variante,
        });

        return {
            ...variante,
        };
    }


    async actualizar(
        variante: VarianteProducto,
    ): Promise<VarianteProducto | null> {

        const indice =
            this.variantes.findIndex(
                (actual) =>
                    actual.id === variante.id,
            );

        if (indice === -1) {
            return null;
        }

        this.variantes[indice] = {
            ...variante,
        };

        return {
            ...variante,
        };
    }
}