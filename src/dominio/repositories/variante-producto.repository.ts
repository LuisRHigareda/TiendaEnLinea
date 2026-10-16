import type {
    VarianteProducto,
} from '../entidades.js';


// Las existencias se manejan por variante.
export interface VarianteProductoRepository {

    listar(): Promise<VarianteProducto[]>;

    listarPorProducto(
        productoId: number,
    ): Promise<VarianteProducto[]>;

    buscarPorId(
        id: number,
    ): Promise<VarianteProducto | null>;

    guardar(
        variante: VarianteProducto,
    ): Promise<VarianteProducto>;

    actualizar(
        variante: VarianteProducto,
    ): Promise<VarianteProducto | null>;
}