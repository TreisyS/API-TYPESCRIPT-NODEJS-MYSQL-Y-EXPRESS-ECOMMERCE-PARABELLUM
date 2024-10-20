
//productosinterface.ts

// productosinterface.ts
export interface Productos {
    idproductos?: number;  // Opcional porque será generado automáticamente.
    nombre: string;
    descripcion: string;
    image_url: string;
    precio: number;
    stock: number;
    categoria_id?: number;  // Puede ser nulo.
    creado?: Date;  
}
