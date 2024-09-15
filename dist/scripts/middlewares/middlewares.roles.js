"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rolesMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        // Usuario "hardcodeado" 
        const user = { name: 'John Doe', role: 'cliente' }; // Cambiar 'admin' a 'gerente' o 'cliente' para pruebas
        if (allowedRoles.includes(user.role)) {
            next();
        }
        else {
            res.status(403).json({ message: 'Access denied: insufficient permissions' });
        }
    };
};
exports.default = rolesMiddleware;
