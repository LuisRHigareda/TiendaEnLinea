import type {
    DetalleOrden,
    Orden,
} from '../entidades.js';


// Acceso a las órdenes y a sus detalles.
export interface OrdenRepository {

    guardar(
        orden: Orden,
        detalles: DetalleOrden[],
    ): Promise<Orden>;

    buscarPorId(
        id: number,
    ): Promise<Orden | null>;

    listarPorUsuarioId(
        usuarioId: number,
    ): Promise<Orden[]>;

    listar(): Promise<Orden[]>;

    obtenerDetalles(
        ordenId: number,
    ): Promise<DetalleOrden[]>;

    actualizar(
        orden: Orden,
    ): Promise<Orden | null>;
}