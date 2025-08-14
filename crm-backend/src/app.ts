import express from 'express';  
import { testConnection } from './config/database';  
import clientRoutes from './routes/clientRoutes';  
import { dateFormatter } from './middlewares/dateFormatter'; // Añade esta línea

const app = express();  
const PORT = process.env.PORT || 3000;  

// 1. Middlewares  
app.use(express.json()); // Para parsear JSON  
app.use(dateFormatter); // ¡Añade esto ANTES de tus rutas!


// 2. Rutas  
app.use('/api/clients', clientRoutes);  

// 3. Iniciar servidor  
testConnection().then(() => {  
  app.listen(PORT, () => {  
    console.log(`🚀 SERVIDOR EN http://localhost:${PORT}`);  
  });  
});  