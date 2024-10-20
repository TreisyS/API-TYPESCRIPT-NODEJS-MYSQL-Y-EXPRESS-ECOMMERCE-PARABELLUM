// orden_articulosinterface.ts
export interface OrdenArticulo {
    idorden_articulos?: number;  // Opcional, autogenerado.
    orden_id: number;
    producto_id: number;
    cantidad: number;
    precio: number;
}
