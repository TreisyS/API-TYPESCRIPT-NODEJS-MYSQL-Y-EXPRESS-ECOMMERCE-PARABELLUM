import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connect } from '../routes/database';
import { Usuario } from '../interfaces/usuariointerface';

const secretKey = process.env.JWT_SECRET || '123Zoe123Victoria';  // Usa una variable de entorno para la clave secreta

// Registro de un nuevo usuario
export async function register(req: Request, res: Response): Promise<void> {
    const { nombre, email, password, role } = req.body;

    //control de valores nulos

    if (!nombre || !email || !password) {
        res.status(400).json({ message: 'Por favor, rellena todos los campos' });
        return;
    }

    try {
        const conn = await connect();
        // Verificar si el email ya está registrado
        const [existingUserRows] = await conn.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if ((existingUserRows as Usuario[]).length > 0) {
            res.status(400).json({ message: 'El email ya está registrado' });
            return;
        }

        // Encriptar la contraseña
        const combinacion = await bcrypt.genSalt(10);
        const passEncriptada = await bcrypt.hash(password, combinacion);

        // Crear nuevo usuario
        const nuevoUsuario: Usuario = {
            nombre,
            email,
            password: passEncriptada,
            role: role || 'customer',  
        };

        await conn.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);

        res.json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
}

// Login de usuario
export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Por favor, rellena todos los campos' });
        return;
    }

    try {
        const conn = await connect();
        const [rows] = await conn.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const usuarios = rows as Usuario[];

        // Verificar si el usuario existe
        if (usuarios.length === 0) {
            res.status(400).json({ message: 'Usuario no encontrado' });
            return;
        }

        const usuario = usuarios[0];

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Contraseña incorrecta' });
            return;
        }

        // Crear el token JWT
        const token = jwt.sign(
            { id: usuario.idusuario, role: usuario.role }, 
            secretKey, 
            { expiresIn: '1h' }  // El token expira en 1 hora
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
}

export async function getUsuarios(_req: Request, res: Response): Promise<void> {
    const page = parseInt(_req.query.page as string) || 1;
    const limit = parseInt(_req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    try {
        const conn = await connect();

        const [usuarios] = await conn.query('SELECT * FROM usuarios LIMIT ? OFFSET ?', [limit, offset]);
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}
  