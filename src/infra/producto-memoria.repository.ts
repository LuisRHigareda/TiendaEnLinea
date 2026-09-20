import type { Producto } from '../dominio/entidades.js';
import type { ProductoRepository } from '../dominio/repositories/producto.repository.js';

import { Color, Talla } from '../dominio/enums.js';

export class ProductoMemoriaRepository implements ProductoRepository {
    private readonly productos: Producto[] = [
        {
            id: 1,
            categoriaId: 1,
            nombre: 'Camiseta básica negra',
            descripcion: 'Camiseta casual de color negro',
            precio: 350,
            talla: Talla.M,
            color: Color.NEGRO,
            stock: 10,
            activo: true,
        },
        {
            id: 2,
            categoriaId: 2,
            nombre: 'Sudadera gris',
            descripcion: 'Sudadera casual de color gris',
            precio: 650,
            talla: Talla.L,
            color: Color.GRIS,
            stock: 3,
            activo: true,
        },
        {
            id: 3,
            categoriaId: 3,
            nombre: 'Pantalón negro',
            descripcion: 'Pantalón casual de color negro',
            precio: 500,
            talla: Talla.M,
            color: Color.NEGRO,
            stock: 5,
            activo: false,
        },
    ];

    async listar(): Promise<Producto[]> {
        return this.productos;
    }

    async buscarPorId(id: number): Promise<Producto | null> {
        return this.productos.find(
            (producto) => producto.id === id,
        ) ?? null;
    }

    async guardar(producto: Producto): Promise<Producto> {
        this.productos.push(producto);

        return producto;
    }

    async actualizar(producto: Producto): Promise<Producto | null> {
        const indice = this.productos.findIndex(
            (actual) => actual.id === producto.id,
        );

        if (indice === -1) {
            return null;
        }

        this.productos[indice] = producto;

        return producto;
    }
}