"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || 'mySecretKey';
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado: no hay token' });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, secretKey); // Ajusta el tipo según tu payload
        req.usuario = { idusuario: verified.id, role: verified.role }; // Guarda los datos del token en `req.usuario`
        return next();
    }
    catch (error) {
        return res.status(400).json({ message: 'Token no válido' });
    }
};
exports.authMiddleware = authMiddleware;
