import type {
    Pago,
} from '../entidades.js';


// Información del pago de una orden.
export interface PagoRepository {

    buscarPorOrdenId(
        ordenId: number,
    ): Promise<Pago | null>;

    guardar(
        pago: Pago,
    ): Promise<Pago>;

    actualizar(
        pago: Pago,
    ): Promise<Pago | null>;
}