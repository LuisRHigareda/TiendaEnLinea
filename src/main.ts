import { ProductoMemoriaRepository } from './infra/producto-memoria.repository.js';
import { TiendaService } from './dominio/services/tienda.service.js';

const repositorio = new ProductoMemoriaRepository();
const tienda = new TiendaService(repositorio);

async function ejecutarEscenarios(): Promise<void> {
    console.log('=== TIENDA EN LINEA - PRUEBAS DEL DOMINIO ===');

    // ---------------------------------------------------------
    // Escenario 1: caso exitoso
    // Camiseta basica negra, talla M
    // Stock: 10
    // Se solicitan 2 unidades
    // ---------------------------------------------------------
    console.log('\n1. ESCENARIO EXITOSO');

    try {
        const resultado = await tienda.agregarAlCarrito(1, 2);

        console.log('Producto agregado correctamente.');
        console.log(
            `${resultado.producto.nombre} - Talla ${resultado.producto.talla}`,
        );
        console.log(`Cantidad: ${resultado.item.cantidad}`);
        console.log(`Precio unitario: $${resultado.producto.precio}`);
        console.log(`Subtotal: $${resultado.subtotal}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`ERROR DE DOMINIO: ${error.message}`);
        }
    }

    // ---------------------------------------------------------
    // Escenario 2: stock insuficiente
    // Sudadera gris, talla L
    // Stock: 3
    // Se solicitan 5 unidades
    // ---------------------------------------------------------
    console.log('\n2. ESCENARIO RECHAZADO - STOCK INSUFICIENTE');

    try {
        await tienda.agregarAlCarrito(2, 5);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`ERROR DE DOMINIO: ${error.message}`);
        }
    }

    // ---------------------------------------------------------
    // Escenario 3: producto inactivo
    // Pantalon negro, talla M
    // ---------------------------------------------------------
    console.log('\n3. ESCENARIO RECHAZADO - PRODUCTO INACTIVO');

    try {
        await tienda.agregarAlCarrito(3, 1);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`ERROR DE DOMINIO: ${error.message}`);
        }
    }
}

void ejecutarEscenarios();