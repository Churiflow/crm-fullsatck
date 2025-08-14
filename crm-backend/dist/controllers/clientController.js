"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.createClient = exports.getAllClients = void 0;
const Client_1 = __importDefault(require("../models/Client"));
// 1. Obtener todos los clientes  
const getAllClients = async (req, res) => {
    try {
        const clients = await Client_1.default.findAll();
        res.json(clients);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
};
exports.getAllClients = getAllClients;
// 2. Crear un nuevo cliente  
const createClient = async (req, res) => {
    try {
        const client = await Client_1.default.create(req.body);
        res.status(201).json(client);
    }
    catch (error) {
        console.error("❌ Error al crear cliente:");
        console.error(error); // Muestra el objeto completo
        console.error("📜 Stack:", error.stack); // Stack trace
        console.error("💬 Mensaje:", error.message); // Mensaje del error
        res.status(400).json({ error: 'Error al crear cliente' });
    }
};
exports.createClient = createClient;
// Actualizar cliente
const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Client_1.default.update(req.body, { where: { id } });
        if (updated) {
            const updatedClient = await Client_1.default.findByPk(id);
            res.json(updatedClient);
        }
        else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar cliente' });
    }
};
exports.updateClient = updateClient;
// Eliminar cliente
const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Client_1.default.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
};
exports.deleteClient = deleteClient;
//# sourceMappingURL=clientController.js.map