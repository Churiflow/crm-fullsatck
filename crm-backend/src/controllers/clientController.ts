import { Request, Response } from 'express';  
import Client from '../models/Client';  

// 1. Obtener todos los clientes  
export const getAllClients = async (req: Request, res: Response) => {  
  try {  
    const clients = await Client.findAll();  
    res.json(clients);  
  } catch (error) {  
    res.status(500).json({ error: 'Error al obtener clientes' });  
  }  
};  

// 2. Crear un nuevo cliente  
export const createClient = async (req: Request, res: Response) => {  
  try {
    const client = await Client.create(req.body);  
    res.status(201).json(client);  
  } catch (error) {  
    console.error("❌ Error al crear cliente:");
    console.error(error); // Muestra el objeto completo
    console.error("📜 Stack:", (error as Error).stack); // Stack trace
    console.error("💬 Mensaje:", (error as Error).message); // Mensaje del error
    res.status(400).json({ error: 'Error al crear cliente' });  
  }  
};




// Actualizar cliente
export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Client.update(req.body, { where: { id } });
    if (updated) {
      const updatedClient = await Client.findByPk(id);
      res.json(updatedClient);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

// Eliminar cliente
export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Client.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};