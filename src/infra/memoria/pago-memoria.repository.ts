import type {
    Pago,
} from '../../dominio/entidades.js';

import type {
    PagoRepository,
} from '../../dominio/repositories/pago.repository.js';


export class PagoMemoriaRepository
implements PagoRepository {

    private readonly pagos: Pago[] = [];

    private siguienteId = 1;


    async buscarPorOrdenId(
        ordenId: number,
    ): Promise<Pago | null> {

        const pago =
            this.pagos.find(
                (actual) =>
                    actual.ordenId === ordenId,
            );

        return pago
            ? { ...pago }
            : null;
    }


    async guardar(
        pago: Pago,
    ): Promise<Pago> {

        const nuevo: Pago = {
            ...pago,
            id:
                pago.id ||
                this.siguienteId++,
        };

        this.pagos.push({
            ...nuevo,
        });

        return {
            ...nuevo,
        };
    }


    async actualizar(
        pago: Pago,
    ): Promise<Pago | null> {

        const indice =
            this.pagos.findIndex(
                (actual) =>
                    actual.id === pago.id,
            );

        if (indice === -1) {
            return null;
        }


        this.pagos[indice] = {
            ...pago,
        };


        return {
            ...pago,
        };
    }
}