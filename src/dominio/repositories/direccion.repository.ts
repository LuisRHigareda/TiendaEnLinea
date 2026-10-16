import type {
    Direccion,
} from '../entidades.js';


// Direcciones registradas por los usuarios.
export interface DireccionRepository {

    buscarPorId(
        id: number,
    ): Promise<Direccion | null>;

    listarPorUsuarioId(
        usuarioId: number,
    ): Promise<Direccion[]>;

    guardar(
        direccion: Direccion,
    ): Promise<Direccion>;

    actualizar(
        direccion: Direccion,
    ): Promise<Direccion | null>;
}