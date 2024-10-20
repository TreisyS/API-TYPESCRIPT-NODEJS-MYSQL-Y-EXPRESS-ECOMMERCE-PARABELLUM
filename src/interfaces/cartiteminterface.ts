// cart_itemsinterface.ts
export interface CartItem {
    idcartitems?: number;  // Opcional, autogenerado.
    usuario_id: number;
    producto_id: number;
    cantidad: number;
    creado?: Date;  // Fecha generada automáticamente.
}
