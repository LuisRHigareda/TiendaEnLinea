import type {
    Envio,
} from '../entidades.js';


// Seguimiento del envío de una orden.
export interface EnvioRepository {

    buscarPorOrdenId(
        ordenId: number,
    ): Promise<Envio | null>;

    guardar(
        envio: Envio,
    ): Promise<Envio>;

    actualizar(
        envio: Envio,
    ): Promise<Envio | null>;
}