"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
const config = {
    port: parseInt(process.env.PORT || '3000', 10),
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/db_prueba'
};
exports.default = config;
//# sourceMappingURL=config.js.map