// express.d.ts
import { Usuario } from '../interfaces/usuariointerface'; 

declare global {
    namespace Express {
        interface Request {
            usuario?: Usuario; 
        }
    }
}
