"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");
const routes_1 = require("./modules/managers/routes");
const routes_2 = require("./modules/users/routes");
const routes_3 = require("./modules/classes/routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/managers', routes_1.default);
app.use('/api/users', routes_2.default);
app.use('/api/classes', routes_3.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
exports.default = app;
//# sourceMappingURL=app.js.map