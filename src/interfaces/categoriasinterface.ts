// categoriasinterface.ts
export interface Categoria {
    idcategorias?: number;  // Opcional, autogenerado.
    nombre: string;
    descripcion?: string;  // Puede ser nulo.
    creado?: Date;  // Fecha generada automáticamente.
}
