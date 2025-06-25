"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const database_1 = require("./core/database");
const config_1 = require("./core/config");
const startServer = async () => {
    await (0, database_1.connectDB)();
    app_1.default.listen(config_1.default.port, () => {
        console.log(`🚀 Server running on port ${config_1.default.port}`);
    });
};
startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map