import type {
    Producto,
} from '../entidades.js';


// Contrato para leer y guardar productos.
export interface ProductoRepository {

    listar(): Promise<Producto[]>;

    buscarPorId(
        id: number,
    ): Promise<Producto | null>;

    guardar(
        producto: Producto,
    ): Promise<Producto>;

    actualizar(
        producto: Producto,
    ): Promise<Producto | null>;
}