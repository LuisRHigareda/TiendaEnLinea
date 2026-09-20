<div align="center">

# Tienda en Línea

### Proyecto Final | Temas Emergentes de Aplicaciones Web

Sistema de comercio electrónico enfocado en la venta de ropa casual.

</div>

---

## Integrantes

- Luis R. Higareda
- Alejandra Garcia
- Janeth Galván
- Angel Cortez

**Profesor:** Martin Guadalupe Bernal Lugo

---

## Video de presentación

En el siguiente video se presenta el proyecto, su dominio, las principales reglas de negocio y parte de su funcionamiento.

[Ver video del proyecto en YouTube](Link)

---

## Descripción

El proyecto consiste en el desarrollo de una tienda en línea enfocada en la venta de ropa casual.

El sistema permitirá a los clientes consultar productos, buscar dentro del catálogo, agregar artículos a un carrito y realizar compras. Por otro lado, los administradores podrán gestionar los productos, las categorías, el inventario y las órdenes realizadas.

Uno de los puntos principales del proyecto es mantener correctamente relacionado el inventario con las compras, evitando que se puedan vender más productos de los que realmente se encuentran disponibles.

---

## Objetivo

Desarrollar una aplicación web de comercio electrónico que permita administrar un catálogo de ropa y realizar el proceso de compra de productos, manteniendo organizadas las operaciones principales de clientes y administradores.

---

## Funcionalidades principales

### Cliente

- Consultar el catálogo de productos.
- Buscar productos por nombre.
- Filtrar productos por categoría y precio.
- Ver el detalle de un producto.
- Consultar la disponibilidad de stock.
- Seleccionar talla y color.
- Agregar productos al carrito.
- Modificar cantidades dentro del carrito.
- Eliminar productos del carrito.
- Consultar el subtotal de la compra.
- Realizar el proceso de checkout.
- Consultar órdenes anteriores.
- Revisar el estado actual de una orden.

### Administrador

- Registrar productos.
- Modificar información de productos.
- Activar o desactivar productos.
- Administrar categorías.
- Ajustar el inventario.
- Consultar las órdenes realizadas.
- Revisar el detalle de una orden.
- Cambiar el estado de las órdenes.
- Consultar productos con stock bajo.
- Visualizar información general de las operaciones de la tienda.

---

## Reglas principales del negocio

Entre las reglas consideradas para el funcionamiento de la tienda se encuentran:

- Un producto debe encontrarse activo para poder agregarse a una compra.
- La cantidad solicitada debe ser de al menos una unidad.
- No se puede solicitar una cantidad mayor al stock disponible.
- Si un producto ya se encuentra en el carrito, su cantidad puede incrementarse sin superar las existencias disponibles.
- No se puede confirmar una compra con un carrito vacío.
- El stock debe verificarse nuevamente antes de confirmar una orden.
- Al completar una compra se descuenta del inventario la cantidad correspondiente.
- El subtotal de un producto se calcula utilizando su precio y cantidad.
- El total de la orden corresponde a la suma de sus productos.
- Una orden nueva comienza con estado pendiente.
- Los productos inactivos no deben mostrarse como disponibles para compra.

---

## Estados de una orden

Las órdenes pueden pasar por los siguientes estados:

```text
PENDIENTE
    ↓
PROCESANDO
    ↓
ENVIADO
    ↓
ENTREGADO
```

---
## Tecnologías

Actualmente el proyecto utiliza:

- TypeScript
- Node.js
- npm
- Git
- GitHub

A lo largo del desarrollo se irán integrando las demás tecnologías necesarias para completar la aplicación web.

---

## Instalación

Para trabajar con el proyecto es necesario tener instalado Node.js y npm.

Después de clonar el repositorio:

```bash
npm install
```

Esto instalará las dependencias necesarias.

---

## Ejecución

Para ejecutar el proyecto durante el desarrollo:

```bash
npm run dev
```

Para comprobar los tipos de TypeScript:

```bash
npm run typecheck
```

Para compilar el proyecto:

```bash
npm run build
```

---

## Documentación del proyecto

Antes de comenzar con la implementación se realizó la documentación general del sistema.

En ella se encuentran el análisis del dominio, las entidades, las reglas de negocio, los diagramas, la arquitectura propuesta y diferentes escenarios considerados para el funcionamiento de la tienda.

[Ver documentación completa en Google Docs](https://docs.google.com/document/d/1s9JTvyutZI3XBHyd-AjcUO9TXOKpSKf6CKpYkbBGn-8/edit?usp=sharing)

---

## Repositorio

Este repositorio será utilizado para concentrar el desarrollo del proyecto durante el curso.

Conforme avance el desarrollo se irán incorporando las diferentes partes necesarias para completar la tienda en línea.

---

<div align="center">

Temas Emergentes de Aplicaciones Web

</div>
