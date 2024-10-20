import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../interfaces/usuariointerface';

const secretKey = process.env.JWT_SECRET || 'mySecretKey';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void | Response => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado: no hay token' });
    }

    try {
        const verified = jwt.verify(token, secretKey) as { id: number; role: string }; // Ajusta el tipo según tu payload
        req.usuario = { idusuario: verified.id, role: verified.role } as Usuario; // Guarda los datos del token en `req.usuario`
        return next();  
    } catch (error) {
        return res.status(400).json({ message: 'Token no válido' });
    }
};

