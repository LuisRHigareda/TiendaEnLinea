import type {
    AjusteInventario,
} from '../../dominio/entidades.js';

import type {
    AjusteInventarioRepository,
} from '../../dominio/repositories/ajuste-inventario.repository.js';


export class AjusteInventarioMemoriaRepository
    implements AjusteInventarioRepository {

    private readonly ajustes:
        AjusteInventario[] = [];

    private siguienteId = 1;


    async guardar(
        ajuste: AjusteInventario,
    ): Promise<AjusteInventario> {

        const nuevo:
            AjusteInventario = {

            ...ajuste,

            id:
                ajuste.id ||
                this.siguienteId++,
        };


        this.ajustes.push({
            ...nuevo,
        });


        return {
            ...nuevo,
        };
    }


    async listar():
        Promise<AjusteInventario[]> {

        return this.ajustes.map(
            (ajuste) => ({
                ...ajuste,
            }),
        );
    }


    async listarPorVarianteId(
        varianteId: number,
    ): Promise<AjusteInventario[]> {

        return this.ajustes
            .filter(
                (ajuste) =>
                    ajuste.varianteId ===
                    varianteId,
            )
            .map(
                (ajuste) => ({
                    ...ajuste,
                }),
            );
    }
}