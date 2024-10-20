import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables del archivo .env

export async function connect() {
    const connection = await createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Bella09018',
        database: process.env.DB_NAME || 'parabellumE_ecommerce_db',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        connectionLimit: 10
    });
    return connection;
}
