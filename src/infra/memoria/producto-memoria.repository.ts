import type {
    Producto,
} from '../../dominio/entidades.js';

import type {
    ProductoRepository,
} from '../../dominio/repositories/producto.repository.js';


export class ProductoMemoriaRepository
    implements ProductoRepository {

    private readonly productos: Producto[] = [
        {
            id: 1,
            categoriaId: 1,
            nombre: 'Camiseta básica negra',
            descripcion: 'Camiseta casual de color negro',
            precio: 350,
            activo: true,
            imagen: 'camiseta-negra.jpg',
        },
        {
            id: 2,
            categoriaId: 2,
            nombre: 'Sudadera gris',
            descripcion: 'Sudadera casual de color gris',
            precio: 650,
            activo: true,
            imagen: 'sudadera-gris.jpg',
        },
        {
            id: 3,
            categoriaId: 3,
            nombre: 'Pantalón negro',
            descripcion: 'Pantalón casual de color negro',
            precio: 500,
            activo: false,
            imagen: 'pantalon-negro.jpg',
        },
    ];


    async listar(): Promise<Producto[]> {
        return this.productos.map(
            (producto) => ({
                ...producto,
            }),
        );
    }


    async buscarPorId(
        id: number,
    ): Promise<Producto | null> {

        const producto =
            this.productos.find(
                (actual) =>
                    actual.id === id,
            );

        return producto
            ? { ...producto }
            : null;
    }


    async guardar(
        producto: Producto,
    ): Promise<Producto> {

        this.productos.push({
            ...producto,
        });

        return {
            ...producto,
        };
    }


    async actualizar(
        producto: Producto,
    ): Promise<Producto | null> {

        const indice =
            this.productos.findIndex(
                (actual) =>
                    actual.id === producto.id,
            );

        if (indice === -1) {
            return null;
        }

        this.productos[indice] = {
            ...producto,
        };

        return {
            ...producto,
        };
    }
}