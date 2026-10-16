import type {
    Envio,
} from '../../dominio/entidades.js';

import type {
    EnvioRepository,
} from '../../dominio/repositories/envio.repository.js';


export class EnvioMemoriaRepository
    implements EnvioRepository {

    private readonly envios: Envio[] = [];

    private siguienteId = 1;


    async buscarPorOrdenId(
        ordenId: number,
    ): Promise<Envio | null> {

        const envio =
            this.envios.find(
                (actual) =>
                    actual.ordenId === ordenId,
            );

        return envio
            ? { ...envio }
            : null;
    }


    async guardar(
        envio: Envio,
    ): Promise<Envio> {

        const nuevo: Envio = {
            ...envio,
            id:
                envio.id ||
                this.siguienteId++,
        };

        this.envios.push({
            ...nuevo,
        });

        return {
            ...nuevo,
        };
    }


    async actualizar(
        envio: Envio,
    ): Promise<Envio | null> {

        const indice =
            this.envios.findIndex(
                (actual) =>
                    actual.id === envio.id,
            );

        if (indice === -1) {
            return null;
        }


        this.envios[indice] = {
            ...envio,
        };


        return {
            ...envio,
        };
    }
}