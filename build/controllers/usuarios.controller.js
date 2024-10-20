"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../routes/database");
const secretKey = process.env.JWT_SECRET || '123Zoe123Victoria'; // Usa una variable de entorno para la clave secreta
// Registro de un nuevo usuario
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, email, password, role } = req.body;
        //control de valores nulos
        if (!nombre || !email || !password) {
            res.status(400).json({ message: 'Por favor, rellena todos los campos' });
            return;
        }
        try {
            const conn = yield (0, database_1.connect)();
            // Verificar si el email ya está registrado
            const [existingUserRows] = yield conn.query('SELECT * FROM usuarios WHERE email = ?', [email]);
            if (existingUserRows.length > 0) {
                res.status(400).json({ message: 'El email ya está registrado' });
                return;
            }
            // Encriptar la contraseña
            const combinacion = yield bcryptjs_1.default.genSalt(10);
            const passEncriptada = yield bcryptjs_1.default.hash(password, combinacion);
            // Crear nuevo usuario
            const nuevoUsuario = {
                nombre,
                email,
                password: passEncriptada,
                role: role || 'customer',
            };
            yield conn.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);
            res.json({ message: 'Usuario registrado exitosamente' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error al registrar usuario', error });
        }
    });
}
// Login de usuario
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Por favor, rellena todos los campos' });
            return;
        }
        try {
            const conn = yield (0, database_1.connect)();
            const [rows] = yield conn.query('SELECT * FROM usuarios WHERE email = ?', [email]);
            const usuarios = rows;
            // Verificar si el usuario existe
            if (usuarios.length === 0) {
                res.status(400).json({ message: 'Usuario no encontrado' });
                return;
            }
            const usuario = usuarios[0];
            // Comparar la contraseña
            const isMatch = yield bcryptjs_1.default.compare(password, usuario.password);
            if (!isMatch) {
                res.status(400).json({ message: 'Contraseña incorrecta' });
                return;
            }
            // Crear el token JWT
            const token = jsonwebtoken_1.default.sign({ id: usuario.idusuario, role: usuario.role }, secretKey, { expiresIn: '1h' } // El token expira en 1 hora
            );
            res.json({ token });
        }
        catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión', error });
        }
    });
}
