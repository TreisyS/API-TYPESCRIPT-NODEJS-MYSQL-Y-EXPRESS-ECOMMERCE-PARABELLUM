import { connect } from '../routes/database' // Ajusta esta ruta según tu estructura

async function testDB() {
    try {
        const db = await connect();
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        console.log('Resultado de la consulta:', rows);
        db.end();  // Cerrar la conexión cuando termines
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
    }
}

testDB();
