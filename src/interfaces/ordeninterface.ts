// ordeninterface.ts
export interface Orden {
    idorden?: number;  // Opcional, autogenerado.
    usuario_id: number;
    total: number;
    estado?: 'pendiente' | 'completo' | 'cancelado';  // Valor por defecto: 'pendiente'.
    creado?: Date;  // Fecha generada automáticamente.
}
