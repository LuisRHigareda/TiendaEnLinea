import type {
    Usuario,
} from '../../dominio/entidades.js';

import {
    RolUsuario,
} from '../../dominio/enums.js';

import type {
    UsuarioRepository,
} from '../../dominio/repositories/usuario.repository.js';


export class UsuarioMemoriaRepository
    implements UsuarioRepository {

    private readonly usuarios: Usuario[] = [
        {
            id: 1,
            nombre: 'Cliente Prueba',
            correo: 'cliente@tienda.mx',

            // Por ahora solamente es un valor de prueba.
            // El hash real con bcrypt se hará en el Avance 2.
            contrasenaHash: 'hash-cliente',

            rol: RolUsuario.CLIENTE,
            telefono: '6440000001',
        },
        {
            id: 2,
            nombre: 'Administrador',
            correo: 'admin@tienda.mx',
            contrasenaHash: 'hash-admin',
            rol: RolUsuario.ADMINISTRADOR,
            telefono: '6440000002',
        },
    ];


    async buscarPorId(
        id: number,
    ): Promise<Usuario | null> {

        const usuario =
            this.usuarios.find(
                (actual) =>
                    actual.id === id,
            );

        return usuario
            ? { ...usuario }
            : null;
    }


    async buscarPorCorreo(
        correo: string,
    ): Promise<Usuario | null> {

        const usuario =
            this.usuarios.find(
                (actual) =>
                    actual.correo === correo,
            );

        return usuario
            ? { ...usuario }
            : null;
    }


    async guardar(
        usuario: Usuario,
    ): Promise<Usuario> {

        this.usuarios.push({
            ...usuario,
        });

        return {
            ...usuario,
        };
    }


    async actualizar(
        usuario: Usuario,
    ): Promise<Usuario | null> {

        const indice =
            this.usuarios.findIndex(
                (actual) =>
                    actual.id === usuario.id,
            );

        if (indice === -1) {
            return null;
        }

        this.usuarios[indice] = {
            ...usuario,
        };

        return {
            ...usuario,
        };
    }
}