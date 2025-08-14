import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  dialect: 'postgres',
  logging: console.log,
  dialectOptions: {
    useUTC: false
  }
});

// Función de conexión ultra-robusta
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    
    // Consulta 100% efectiva para todas las versiones de PostgreSQL
    const [result]: any = await sequelize.query(`
      SELECT current_setting('TimeZone') as timezone
    `);
    
    // Extracción segura del resultado
    const timezone = (
      (Array.isArray(result) && result[0]?.timezone) ||
      (typeof result === 'object' && result.timezone) ||
      'UTC (No detectada)'
    );
    
    console.log(`✅ PostgreSQL conectado | Zona horaria: ${timezone}`);
    return true;
  } catch (error) {
    console.error('❌ Error de conexión:', (error as Error).message);
    return false;
  }
};

export { sequelize };