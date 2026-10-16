import type {
    Usuario,
} from '../entidades.js';


// Acceso a los usuarios registrados.
export interface UsuarioRepository {

    buscarPorId(
        id: number,
    ): Promise<Usuario | null>;

    buscarPorCorreo(
        correo: string,
    ): Promise<Usuario | null>;

    guardar(
        usuario: Usuario,
    ): Promise<Usuario>;

    actualizar(
        usuario: Usuario,
    ): Promise<Usuario | null>;
}