"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.testConnection = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Validar variables de entorno
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
    throw new Error("⚠️ Faltan variables de entorno para la DB");
}
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, // Nombre de la base de datos
process.env.DB_USER, // Usuario PostgreSQL
process.env.DB_PASSWORD, // Contraseña
{
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: false, // Cambiar a `true` para debug
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
exports.sequelize = sequelize;
// Función para testear la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL establecida correctamente');
    }
    catch (error) {
        console.error('❌ Error al conectar a PostgreSQL:', error);
    }
};
exports.testConnection = testConnection;
//# sourceMappingURL=database.js.map