"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// 1. Middlewares  
app.use(express_1.default.json()); // Para parsear JSON  
// 2. Rutas  
app.use('/api/clients', clientRoutes_1.default);
// 3. Iniciar servidor  
(0, database_1.testConnection)().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 SERVIDOR EN http://localhost:${PORT}`);
    });
});
//# sourceMappingURL=app.js.map