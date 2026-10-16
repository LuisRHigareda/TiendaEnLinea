import type {
    AjusteInventario,
} from '../entidades.js';


// Historial de movimientos manuales del inventario.
export interface AjusteInventarioRepository {

    guardar(
        ajuste: AjusteInventario,
    ): Promise<AjusteInventario>;

    listar(): Promise<AjusteInventario[]>;

    listarPorVarianteId(
        varianteId: number,
    ): Promise<AjusteInventario[]>;
}