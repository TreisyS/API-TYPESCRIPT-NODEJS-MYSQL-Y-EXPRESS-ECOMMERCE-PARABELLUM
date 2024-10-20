"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//usuarios.routes.ts
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const router = (0, express_1.Router)();
router.route('/register')
    .post(usuarios_controller_1.register);
router.route('/login')
    .post(usuarios_controller_1.login);
//router.post('/register', register);
// Ruta para hacer login de usuario
//router.post('/login', login);
// Ruta protegida de ejemplo para usuarios autenticados (requiere token)
router.get('/profile', (req, res) => {
    res.json({ message: 'Bienvenido a tu perfil', usuario: req.usuario });
});
exports.default = router;
/*router.route('/')
  .get(getproductos)  // Obtención de productos disponible para todos
  .post(agregarproductos); */ 
