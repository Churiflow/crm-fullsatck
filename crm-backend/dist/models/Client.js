"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
// 2. Crear el modelo de Sequelize  
class Client extends sequelize_1.Model {
}
// 3. Inicializar el modelo  
Client.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    lastContactDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.sequelize, // Conexión a la DB  
    modelName: 'client', // Nombre del modelo  
    timestamps: true, // Añade createdAt y updatedAt  
});
// 4. Exportar el modelo  
exports.default = Client;
//# sourceMappingURL=Client.js.map