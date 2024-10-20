
import { Role } from '../enum/roles.enum';

export interface Usuario {
    idusuario?: number;  // Opcional, autogenerado.
    nombre: string;
    email: string;
    password: string;
    role?: Role;  
    creado?: Date; 
 }