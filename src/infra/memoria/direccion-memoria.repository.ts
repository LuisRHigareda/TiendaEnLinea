import type {
    Direccion,
} from '../../dominio/entidades.js';

import type {
    DireccionRepository,
} from '../../dominio/repositories/direccion.repository.js';


export class DireccionMemoriaRepository
implements DireccionRepository {

    private readonly direcciones: Direccion[] = [
        {
            id: 1,
            usuarioId: 1,
            codigoPostal: '85000',
            numeroCasa: '100',
            calle: 'Calle de prueba',
            colonia: 'Centro',
            ciudad: 'Ciudad Obregón',
            estado: 'Sonora',
        },
    ];


    async buscarPorId(
        id: number,
    ): Promise<Direccion | null> {

        const direccion =
            this.direcciones.find(
                (actual) =>
                    actual.id === id,
            );

        return direccion
            ? { ...direccion }
            : null;
    }


    async listarPorUsuarioId(
        usuarioId: number,
    ): Promise<Direccion[]> {

        return this.direcciones
            .filter(
                (direccion) =>
                    direccion.usuarioId === usuarioId,
            )
            .map(
                (direccion) => ({
                    ...direccion,
                }),
            );
    }


    async guardar(
        direccion: Direccion,
    ): Promise<Direccion> {

        this.direcciones.push({
            ...direccion,
        });

        return {
            ...direccion,
        };
    }


    async actualizar(
        direccion: Direccion,
    ): Promise<Direccion | null> {

        const indice =
            this.direcciones.findIndex(
                (actual) =>
                    actual.id === direccion.id,
            );

        if (indice === -1) {
            return null;
        }

        this.direcciones[indice] = {
            ...direccion,
        };

        return {
            ...direccion,
        };
    }
}