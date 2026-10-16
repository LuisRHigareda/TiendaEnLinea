import type {
    DetalleOrden,
    Orden,
} from '../../dominio/entidades.js';

import type {
    OrdenRepository,
} from '../../dominio/repositories/orden.repository.js';


export class OrdenMemoriaRepository
implements OrdenRepository {

    private readonly ordenes: Orden[] = [];

    private readonly detalles: DetalleOrden[] = [];

    private siguienteOrdenId = 1;

    private siguienteDetalleId = 1;


    async guardar(
        orden: Orden,
        detalles: DetalleOrden[],
    ): Promise<Orden> {

        // El repositorio se encarga de asignar el identificador.
        const nuevaOrden: Orden = {
            ...orden,
            id:
                orden.id ||
                this.siguienteOrdenId++,
        };


        this.ordenes.push({
            ...nuevaOrden,
        });


        // Los detalles guardan el id de la orden recién creada.
        for (const detalle of detalles) {

            const nuevoDetalle: DetalleOrden = {
                ...detalle,
                id:
                    detalle.id ||
                    this.siguienteDetalleId++,

                ordenId:
                    nuevaOrden.id,
            };

            this.detalles.push(
                nuevoDetalle,
            );
        }


        return {
            ...nuevaOrden,
        };
    }


    async buscarPorId(
        id: number,
    ): Promise<Orden | null> {

        const orden =
            this.ordenes.find(
                (actual) =>
                    actual.id === id,
            );

        return orden
            ? { ...orden }
            : null;
    }


    async listarPorUsuarioId(
        usuarioId: number,
    ): Promise<Orden[]> {

        return this.ordenes
            .filter(
                (orden) =>
                    orden.usuarioId === usuarioId,
            )
            .map(
                (orden) => ({
                    ...orden,
                }),
            );
    }


    async listar(): Promise<Orden[]> {

        return this.ordenes.map(
            (orden) => ({
                ...orden,
            }),
        );
    }


    async obtenerDetalles(
        ordenId: number,
    ): Promise<DetalleOrden[]> {

        return this.detalles
            .filter(
                (detalle) =>
                    detalle.ordenId === ordenId,
            )
            .map(
                (detalle) => ({
                    ...detalle,
                }),
            );
    }


    async actualizar(
        orden: Orden,
    ): Promise<Orden | null> {

        const indice =
            this.ordenes.findIndex(
                (actual) =>
                    actual.id === orden.id,
            );

        if (indice === -1) {
            return null;
        }


        this.ordenes[indice] = {
            ...orden,
        };


        return {
            ...orden,
        };
    }
}