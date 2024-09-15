"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_roles_1 = __importDefault(require("../middlewares/middlewares.roles"));
const controllers_user_1 = require("../controllers/controllers.user");
const app = (0, express_1.default)();
const port = 3000;
app.get("/usuarios", (0, middlewares_roles_1.default)(["admin", "gerente"]), controllers_user_1.listAll);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
