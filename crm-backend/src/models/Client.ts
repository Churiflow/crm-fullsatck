import { DataTypes, Model } from 'sequelize';  
import {sequelize} from '../config/database';  

// 1. Definir la interfaz TypeScript  
interface ClientAttributes {  
  id: number;  
  name: string;  
  email: string;  
  last_contact_date: Date;  
}  

// 2. Crear el modelo de Sequelize  
class Client extends Model<ClientAttributes> implements ClientAttributes {  
  public id!: number;  
  public name!: string;  
  public email!: string;  
  public last_contact_date!: Date;  
}  

// 3. Inicializar el modelo  
Client.init(  
  {  
    id: {  
      type: DataTypes.INTEGER,  
      autoIncrement: true,  
      primaryKey: true,  
    },  
    name: {  
      type: DataTypes.STRING,  
      allowNull: false,  
    },  
    email: {  
      type: DataTypes.STRING,  
      unique: true,  
      allowNull: false,  
    },  
    last_contact_date: {  
      type: DataTypes.DATE,  
      defaultValue: DataTypes.NOW,  
    },  
  },  
  {  
    sequelize, // Conexión a la DB  
    modelName: 'client', // Nombre del modelo  
    timestamps: true, // Añade createdAt y updatedAt  
  }  
);  

// 4. Exportar el modelo  
export default Client;  